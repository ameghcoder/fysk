"use client"
import {
    Button,
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "@fysk/ui"

export default function FormDemo(props: React.ComponentProps<typeof Form>) {
    return (
        <Form
            state="idle"
            className="w-full max-w-sm border border-border p-6 rounded-lg bg-card"
            {...props}
        >
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="email@fysk.dev" />
                </FormControl>
                <FormMessage />
            </FormItem>
            <Button className="w-full">Sign Up</Button>
        </Form>
    )
}
