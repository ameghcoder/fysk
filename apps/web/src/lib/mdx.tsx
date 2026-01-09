import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  Button,
  Typography,
  TypographyProvider,
  Badge,
  Avatar,
  Input,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Progress,
  Empty,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Kbd,
  KbdGroup,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectItem,
  MultiSelectSeparator,
  Textarea,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  SmartPagination,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarItem,
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  OTPInput,
  Label
} from "@fysk/ui";
import ComponentPreview from "@/components/layout/component-preview";
import CodeBlock from "@/components/layout/code-block";
import { PlusIcon, Mail, Search, Bold, Italic, Send } from "lucide-react";

// Demo Components
import FormExampleDefault01 from "@/components/examples/form-example-default-01";
import FormDemo from "@/components/examples/form-example-preview-01";
import TypographyVariants from "@/components/examples/typography-example-variants-01";
import BadgeDemo from "@/components/examples/badge-example-default-01";
import ButtonVariants from "@/components/examples/button-example-variants-01";
import ButtonSizes from "@/components/examples/button-example-sizes-01";
import ButtonIcons from "@/components/examples/button-example-icons-01";
import ButtonAsChild from "@/components/examples/button-example-as-child-01";
import ButtonStates from "@/components/examples/button-example-states-01";
import EmptyDemo from "@/components/examples/empty-example-default-01";
import AvatarDemo from "@/components/examples/avatar-example-default-01";
import InputDemo from "@/components/examples/input-example-default-01";
import OTPInputDemo from "@/components/examples/input-otp-example-default-01";
import KbdDemo from "@/components/examples/kbd-example-default-01";
import PaginationDemo from "@/components/examples/pagination-example-default-01";
import ProgressDemo from "@/components/examples/progress-example-default-01";
import SelectDemo from "@/components/examples/select-example-default-01";
import SidebarDemo from "@/components/examples/sidebar-example-default-01";
import SwitchDemo from "@/components/examples/switch-example-default-01";
import TabsDemo from "@/components/examples/tabs-example-default-01";
import TextareaDemo from "@/components/examples/textarea-example-default-01";
import TextareaAutosize from "@/components/examples/textarea-example-autosize-01";
import TooltipDemo from "@/components/examples/tooltip-example-default-01";
import TypographyDemo from "@/components/examples/typography-example-default-01";
import TextareaToolbar01 from "@/components/examples/textarea-example-toolbar-01";
import TooltipVariants from "@/components/examples/tooltip-example-variants-01";
import TabsVariants from "@/components/examples/tabs-example-variants-01";
import SwitchVariants from "@/components/examples/switch-example-variants-01";
import ProgressVariants from "@/components/examples/progress-example-variants-01";
import PaginationSmart from "@/components/examples/pagination-example-smart-01";
import KbdVariants from "@/components/examples/kbd-example-variants-01";
import InputOTPVariants from "@/components/examples/input-otp-example-variants-01";
import InputVariants from "@/components/examples/input-example-variants-01";
import AvatarVariants from "@/components/examples/avatar-example-variants-01";
import { JSXElementConstructor, ReactElement } from "react";

// Dynamic path based on your requirement
const DOCS_PATH = path.join(process.cwd(), "src/app/(docs)/docs/atoms/react");

// Helper to slugify text for IDs
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export type OnThisPageHeadings = { level: number; text: string; id: string }
export type DocData = {
  toc: OnThisPageHeadings[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: ReactElement<unknown, string | JSXElementConstructor<any>>
}

function extractHeadings(content: string) {
  const headings: OnThisPageHeadings[] = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^(##|###) (.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({
        level,
        text,
        id: slugify(text),
      });
    }
  });

  return headings;
}

export async function getDocData(slug: string) {
  const fullPath = path.join(DOCS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to extract metadata
  const { data, content } = matter(fileContents);

  // Extract TOC
  const toc = extractHeadings(content);

  // Compile MDX to React Server Components
  const mdx = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      }
    },
    components: {
      // icons
      Mail,
      Search,
      PlusIcon,
      Send,
      Bold,
      Italic,
      // Blocks
      FormExampleDefault01,
      FormDemo,
      BadgeDemo,
      ButtonVariants,
      ButtonSizes,
      ButtonIcons,
      ButtonAsChild,
      ButtonStates,
      EmptyDemo,
      AvatarDemo,
      AvatarVariants,
      InputDemo,
      InputVariants,
      OTPInputDemo,
      InputOTPVariants,
      KbdDemo,
      KbdVariants,
      PaginationDemo,
      PaginationSmart,
      ProgressDemo,
      ProgressVariants,
      SelectDemo,
      SidebarDemo,
      SwitchDemo,
      SwitchVariants,
      TabsDemo,
      TabsVariants,
      TextareaDemo,
      TextareaAutosize,
      TextareaToolbar01,
      TooltipDemo,
      TooltipVariants,
      TypographyDemo,
      TypographyVariants,
      // components
      ComponentPreview,
      CodeBlock,
      Button,
      Badge,
      Avatar,
      Input,
      Switch,
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
      Progress,
      Empty,
      Form,
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
      Kbd,
      KbdGroup,
      Select,
      SelectGroup,
      SelectValue,
      SelectTrigger,
      SelectContent,
      SelectLabel,
      SelectItem,
      SelectSeparator,
      SelectScrollUpButton,
      SelectScrollDownButton,
      MultiSelect,
      MultiSelectTrigger,
      MultiSelectContent,
      MultiSelectGroup,
      MultiSelectLabel,
      MultiSelectItem,
      MultiSelectSeparator,
      Textarea,
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
      PaginationFirst,
      PaginationLast,
      SmartPagination,
      Sidebar,
      SidebarHeader,
      SidebarFooter,
      SidebarContent,
      SidebarGroup,
      SidebarGroupLabel,
      SidebarGroupContent,
      SidebarItem,
      SidebarTrigger,
      SidebarProvider,
      SidebarInset,
      Tooltip,
      TooltipTrigger,
      TooltipContent,
      TooltipPortal,
      OTPInput,
      Label,
      Typography,
      TypographyProvider,
      h1: (props) => <Typography {...props} variant="h1" />,
      h2: (props) => {
        const id = slugify(props.children?.toString() || "");
        return <Typography id={id} {...props} variant="h2" className="scroll-mt-20" />;
      },
      h3: (props) => {
        const id = slugify(props.children?.toString() || "");
        return <Typography id={id} {...props} variant="h3" className="scroll-mt-20" />;
      },
      h4: (props) => <Typography {...props} variant="h4" />,
      p: (props) => <Typography {...props} />,
      blockquote: (props) => <Typography {...props} variant="blockquote" />,
      table: (props) => <div className="overflow-x-auto"><table {...props} /></div>
    },
  });

  return {
    meta: data,
    content: mdx.content,
    toc,
  };
}
