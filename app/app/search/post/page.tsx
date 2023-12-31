import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { PostItem } from "@/components/post"

async function getPost(query: string, filters?: string, type?: string) {

    const whereClause: any = {
        title: {
            search: query
        },
        description: {
            search: query
        },
    };

    if (filters) {
        filters = filters.replace("#", "")
        filters = filters.replaceAll("#", "|")
        filters = filters.replaceAll(" ", "")
        whereClause.OR = {
                OR: filters.split("|").map((substring) => ({
                    keywords: {
                        contains: `|${substring}`,
                    },
                })),
        }
    }
    if (type && type !== "all") {
        whereClause.type = type;
    }
    const posts = await db.post.findMany({
        where: whereClause,
        select: {
            id: true,
            title: true,
            description: true,
            hash: true,
            type: true,
            keywords: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    email: true,
                }
            }
        },
    });

    return posts;
}


type SearchParamsProps = {
    searchParams: {
        query: string,
        filters?: string,
        type?: string,
    }
}

export default async function Page({ searchParams }: SearchParamsProps) {


    const posts = await getPost(searchParams.query, searchParams.filters, searchParams.type)
    return posts.length ? (
        <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>

    ) : <div className="font-light">Aucune publication</div>
}
