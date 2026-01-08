import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@fysk/ui"

export default function TabsVariants() {
    return (
        <div className="flex flex-col gap-12 w-full">
            <Tabs variant="default" defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Default</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
            </Tabs>

            <Tabs variant="glass" defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Glass</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
            </Tabs>

            <Tabs variant="underline" defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Underline</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
            </Tabs>

            <Tabs variant="pill" defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Pill</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
