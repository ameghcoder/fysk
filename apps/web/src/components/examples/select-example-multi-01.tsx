import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@fysk/ui"

export default function SelectMulti() {
    return (
        <Select selection="multiple" defaultValues={["apple", "banana"]}>
            <SelectTrigger className="w-[280px]" placeholder="Custom fruits..." />
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="cherry">Cherry</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
