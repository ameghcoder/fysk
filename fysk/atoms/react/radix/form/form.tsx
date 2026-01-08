"use client"
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react"
import {
    useFormContext,
    Controller,
    FormProvider,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import { useFyskConfig } from "@/components/fysk-provider"


// Types

type FormState = "idle" | "loading" | "success" | "error"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    state?: FormState
    afterSubmission?: React.ReactNode
    onCloseAfterSubmission?: () => void
}

// Context Types

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

type FormItemContextValue = {
    id: string
}

// Contexts

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormItemContext = React.createContext<FormItemContextValue>({ id: "" })

// useFormField Hook

/**
 * Hook to access the current form field's state and metadata.
 * Must be used within a `FormField` and `FormItem` component.
 *
 * @returns An object containing:
 * - `id` - The unique ID for the form item
 * - `name` - The field name registered with react-hook-form
 * - `formItemId` - ID for the form item element
 * - `formDescriptionId` - ID for the description element (for aria-describedby)
 * - `formMessageId` - ID for the error message element
 * - `error` - The current field error (if any)
 * - `invalid` - Whether the field has a validation error
 * - `isDirty` - Whether the field value has been modified
 * - `isTouched` - Whether the field has been touched/focused
 *
 * @example
 * ```tsx
 * const CustomInput = () => {
 *   const { error, formItemId } = useFormField()
 *   return (
 *     <input
 *       id={formItemId}
 *       className={error ? "border-red-500" : ""}
 *     />
 *   )
 * }
 * ```
 */
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    if (!fieldContext.name) {
        throw new Error("useFormField must be used within a FormField component")
    }

    const fieldState = getFieldState(fieldContext.name, formState)
    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

// Form Component

/**
 * A form wrapper component with built-in state management for loading,
 * success, and error states. Includes overlay displays for submission feedback.
 *
 * @param state - The current form state: "idle" | "loading" | "success" | "error"
 * @param afterSubmission - Content to display after successful form submission
 * @param onCloseAfterSubmission - Callback when the after-submission overlay is closed
 * @param LoadingIcon - Custom loading icon (defaults to Loader2)
 * @param SuccessIcon - Custom success icon (defaults to CheckCircle2)
 * @param ErrorIcon - Custom error icon (defaults to XCircle)
 * @param CloseIcon - Custom close icon (defaults to X)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Form onSubmit={handleSubmit}>
 *   <FormItem>
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input type="email" />
 *     </FormControl>
 *   </FormItem>
 *   <Button type="submit">Submit</Button>
 * </Form>
 *
 * // With react-hook-form and Zod validation
 * const formSchema = z.object({
 *   email: z.string().email("Invalid email"),
 *   password: z.string().min(8, "Min 8 characters"),
 * })
 *
 * function LoginForm() {
 *   const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
 *   const form = useForm<z.infer<typeof formSchema>>({
 *     resolver: zodResolver(formSchema),
 *     defaultValues: { email: "", password: "" },
 *   })
 *
 *   const onSubmit = async (data) => {
 *     setFormState("loading")
 *     try {
 *       await submitForm(data)
 *       setFormState("success")
 *     } catch {
 *       setFormState("error")
 *     }
 *   }
 *
 *   return (
 *     <FormProvider {...form}>
 *       <Form
 *         state={formState}
 *         afterSubmission="Thank you for signing up!"
 *         onSubmit={form.handleSubmit(onSubmit)}
 *       >
 *         <FormField
 *           control={form.control}
 *           name="email"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Email</FormLabel>
 *               <FormControl>
 *                 <Input placeholder="you@example.com" {...field} />
 *               </FormControl>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 *         <Button type="submit">Sign In</Button>
 *       </Form>
 *     </FormProvider>
 *   )
 * }
 * ```
 */
const Form = React.forwardRef<HTMLFormElement, FormProps & { LoadingIcon?: React.ReactNode, SuccessIcon?: React.ReactNode, ErrorIcon?: React.ReactNode, CloseIcon?: React.ReactNode }>(
    (props, ref) => {
        const {
            className,
            state = "idle",
            afterSubmission,
            onCloseAfterSubmission,
            children,
            LoadingIcon,
            SuccessIcon,
            ErrorIcon,
            CloseIcon,
            ...remainingProps
        } = props;

        const [showOverlay, setShowOverlay] = React.useState(false)
        const config = useFyskConfig()

        React.useEffect(() => {
            if (state === "success" && afterSubmission) {
                setShowOverlay(true)
            }
        }, [state, afterSubmission])

        const handleClose = () => {
            setShowOverlay(false)
            onCloseAfterSubmission?.()
        }

        const finalLoadingIcon = LoadingIcon || config.icons?.loading || <Loader2 className="h-8 w-8 animate-spin text-primary" />
        const finalCloseIcon = CloseIcon || config.icons?.close || <X className="h-4 w-4 text-muted-foreground" />
        const finalSuccessIcon = SuccessIcon || config.icons?.success || <CheckCircle2 className="h-8 w-8 text-[#22c55e]" />
        const finalErrorIcon = ErrorIcon || config.icons?.error || <XCircle className="h-5 w-5 text-destructive shrink-0" />

        // Extract react-hook-form props to avoid passing to native <form>
        const {
            control,
            handleSubmit,
            register,
            watch,
            setValue,
            getValues,
            reset,
            resetField,
            unregister,
            trigger,
            setError,
            clearErrors,
            setFocus,
            getFieldState,
            formState,
            subscribe,
            ...htmlProps
        } = remainingProps as any;

        // Check if we are being used with a spread form instance
        const isRHF = !!control && !!handleSubmit;

        const formContent = (
            <div className="relative">
                <form
                    ref={ref}
                    className={cn(
                        "space-y-6 transition-all duration-500",
                        state === "loading" && "pointer-events-none opacity-60",
                        className
                    )}
                    {...htmlProps}
                >
                    {children}
                </form>

                {/* Loading Overlay */}
                {state === "loading" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg z-10 animate-in fade-in duration-300">
                        <div className="flex flex-col items-center gap-3 p-6">
                            <span className="[&_svg]:size-8 [&_svg]:animate-spin [&_svg]:text-primary">{finalLoadingIcon}</span>
                            <p className="text-sm font-medium text-foreground">Submitting...</p>
                        </div>
                    </div>
                )}

                {/* After Submission Overlay */}
                {showOverlay && afterSubmission && state === "success" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-lg z-20 animate-in fade-in duration-300">
                        <div className="relative max-w-md w-full mx-4 p-8 bg-card rounded-lg shadow-xl border border-border animate-in zoom-in-95 duration-300">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent transition-colors duration-150"
                                aria-label="Close"
                            >
                                <span className="[&_svg]:size-4 [&_svg]:text-muted-foreground">{finalCloseIcon}</span>
                            </button>

                            {/* Success Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-[#22c55e]/10 rounded-full">
                                    <span className="[&_svg]:size-8 [&_svg]:text-[#22c55e]">{finalSuccessIcon}</span>
                                </div>
                            </div>

                            {/* After Submission Content */}
                            <div className="text-center">
                                {typeof afterSubmission === "string" ? (
                                    <p className="text-base text-foreground">{afterSubmission}</p>
                                ) : (
                                    afterSubmission
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State Indicator */}
                {state === "error" && (
                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                        <span className="[&_svg]:size-5 [&_svg]:text-destructive [&_svg]:shrink-0">{finalErrorIcon}</span>
                        <p className="text-sm font-medium text-destructive">
                            There was an error submitting the form. Please try again.
                        </p>
                    </div>
                )}
            </div>
        )

        if (isRHF) {
            return (
                <FormProvider {...(remainingProps as any)}>
                    {formContent}
                </FormProvider>
            )
        }

        return formContent;
    }
)
Form.displayName = "Form"

// FormField Component

/**
 * A wrapper around react-hook-form's Controller that provides context
 * to child components. Use this to connect form inputs to react-hook-form.
 *
 * @template TFieldValues - The type of your form values (inferred from Zod schema)
 * @template TName - The field path/name type
 *
 * @param control - The form control object from useForm()
 * @param name - The field name (must match a key in your form schema)
 * @param render - Render function that receives field props and state
 *
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form"
 * import { zodResolver } from "@hookform/resolvers/zod"
 * import * as z from "zod"
 *
 * const schema = z.object({
 *   username: z.string().min(3, "Username must be at least 3 characters"),
 * })
 *
 * function MyForm() {
 *   const form = useForm<z.infer<typeof schema>>({
 *     resolver: zodResolver(schema),
 *   })
 *
 *   return (
 *     <FormProvider {...form}>
 *       <Form onSubmit={form.handleSubmit(onSubmit)}>
 *         <FormField
 *           control={form.control}
 *           name="username"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Username</FormLabel>
 *               <FormControl>
 *                 <Input {...field} />
 *               </FormControl>
 *               <FormDescription>
 *                 This will be your public display name.
 *               </FormDescription>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 *       </Form>
 *     </FormProvider>
 *   )
 * }
 * ```
 */
const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

// FormItem Component

/**
 * A container for a single form field. Provides spacing and context
 * for associating labels, descriptions, and error messages.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <Input type="email" />
 *   </FormControl>
 *   <FormDescription>Enter your email address</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId()
    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
})
FormItem.displayName = "FormItem"

// FormLabel Component

/**
 * A label for form inputs. Automatically associates with the input
 * via the FormItem context.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Password</FormLabel>
 *   <FormControl>
 *     <Input type="password" />
 *   </FormControl>
 * </FormItem>
 * ```
 */
const FormLabel = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { id } = React.useContext(FormItemContext)

    // Try to get error state if within FormField context
    let hasError = false
    try {
        const { error } = useFormField()
        hasError = !!error
    } catch {
        // Not within FormField context, that's okay for basic usage
    }

    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                hasError && "text-destructive",
                className
            )}
            htmlFor={`${id}-form-item`}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"

// FormControl Component

/**
 * Wraps form inputs to provide proper accessibility attributes.
 * Uses Radix Slot to merge props with the child element.
 *
 * When used within a FormField, automatically adds:
 * - Unique ID for label association
 * - aria-describedby for description and error message
 * - aria-invalid when field has validation errors
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <Input type="email" placeholder="Enter your email" />
 * </FormControl>
 *
 * // With react-hook-form field
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormControl = React.forwardRef<
    React.ComponentRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { id } = React.useContext(FormItemContext)

    // Try to get form field context for react-hook-form integration
    let formFieldProps = {}
    try {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
        formFieldProps = {
            id: formItemId,
            "aria-describedby": !error
                ? formDescriptionId
                : `${formDescriptionId} ${formMessageId}`,
            "aria-invalid": !!error,
        }
    } catch {
        // Not within FormField context - use basic ID association
        formFieldProps = {
            id: `${id}-form-item`,
            "aria-describedby": `${id}-form-item-description`,
        }
    }

    return (
        <Slot
            ref={ref}
            {...formFieldProps}
            {...props}
        />
    )
})
FormControl.displayName = "FormControl"

// FormDescription Component

/**
 * Provides additional context or instructions for a form field.
 * Automatically associated with the input via aria-describedby.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Password</FormLabel>
 *   <FormControl>
 *     <Input type="password" />
 *   </FormControl>
 *   <FormDescription>
 *     Must be at least 8 characters with one uppercase letter.
 *   </FormDescription>
 * </FormItem>
 * ```
 */
const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { id } = React.useContext(FormItemContext)
    return (
        <p
            ref={ref}
            id={`${id}-form-item-description`}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
})
FormDescription.displayName = "FormDescription"

// FormMessage Component

/**
 * Displays validation error messages for a form field.
 * When used within a FormField, automatically displays the
 * error message from react-hook-form validation.
 *
 * @param state - Visual state: "error" (red) or "success" (green). Defaults to "error".
 * @param children - Custom message content (overrides auto-detected error)
 *
 * @example
 * ```tsx
 * // Auto-display validation errors from react-hook-form
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *       <FormMessage /> {/* Automatically shows Zod validation errors *\/}
 *     </FormItem>
 *   )}
 * />
 *
 * // Manual message
 * <FormMessage state="success">Email is available!</FormMessage>
 *
 * // Custom error message
 * <FormMessage>Please enter a valid email address</FormMessage>
 * ```
 */
const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & { state?: "error" | "success" }
>(({ className, state = "error", children, ...props }, ref) => {
    const { id } = React.useContext(FormItemContext)

    // Try to get error from react-hook-form context
    let errorMessage: string | undefined
    let messageId = `${id}-form-item-message`

    try {
        const { error, formMessageId } = useFormField()
        errorMessage = error?.message
        messageId = formMessageId
    } catch {
        // Not within FormField context, that's okay
    }

    // Use children if provided, otherwise use error from form state
    const body = children || errorMessage

    if (!body) return null

    return (
        <p
            ref={ref}
            id={messageId}
            className={cn(
                "text-sm font-medium",
                state === "error" ? "text-destructive" : "text-[#22c55e]",
                className
            )}
            {...props}
        >
            {body}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

// Exports

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormProvider,
    useFormField,
}

// Re-export types for convenience
export type { FormState, FormProps }
