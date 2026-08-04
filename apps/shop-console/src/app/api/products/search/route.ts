import { searchProduct } from "@repo/commerce/server";


export async function POST(request: Request) {

    const body =
        await request.json();

    const result =
        await searchProduct({

            filter: body.filter,

            sort: body.sort,

            page: body.page ?? 1,

            pageSize: body.pageSize ?? 20,

        });
    
    if (!result) {

        return Response.json({
            error: "No products found"
        }, {
            status: 404
        });
        
    }

    return Response.json({

        items: result.items,

        pagination: {

            page: result.pagination.page,

            pageSize: result.pagination.pageSize,

            total: result.pagination.total,

            hasMore:

                result.pagination.page * result.pagination.pageSize
                < result.pagination.total,

        },

    });

}