import { Empty } from "@fysk/ui"

export default function EmptyVariants() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Empty
                variant="default"
                title="Empty Project"
                description="This project doesn't have any folders."
            />
            <Empty
                variant="default"
                title="No Posts"
                description="You haven't written any posts yet."
            />
        </div>
    )
}


