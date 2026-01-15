"use client"

import { Input } from "@fysk/ui"
import { Eye, EyeOff, X } from "lucide-react"
import { useState } from "react"

export default function InputInteractiveIcon() {
    const [showPassword, setShowPassword] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Password Toggle</p>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    icon={showPassword ? <EyeOff /> : <Eye />}
                    iconPosition="end"
                    onIconClick={() => setShowPassword(!showPassword)}
                />
            </div>

            <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Clearable Search</p>
                <Input
                    placeholder="Search components..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    icon={searchValue ? <X /> : null}
                    iconPosition="end"
                    onIconClick={() => setSearchValue("")}
                />
            </div>
        </div>
    )
}


