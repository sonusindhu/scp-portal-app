import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Trash2, Pencil, MoreVertical } from "lucide-react";

/**
 * Demo page showing shadcn/ui components
 * This demonstrates the new Tailwind + shadcn/ui setup
 */
export const TailwindDemo = () => {
  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tailwind + shadcn/ui Demo</h1>
        <p className="text-muted-foreground">
          Your project is now set up with Tailwind CSS and shadcn/ui components
        </p>
      </div>

      {/* Buttons Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            Different button styles available out of the box
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Button Sizes</h3>
            <div className="flex items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">With Icons</h3>
            <div className="flex gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tabs Component</CardTitle>
          <CardDescription>
            Replace MUI Tabs with this component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                General information content goes here
              </p>
            </TabsContent>
            <TabsContent value="contacts">
              <p className="text-sm text-muted-foreground">
                Contacts list would go here
              </p>
            </TabsContent>
            <TabsContent value="notes">
              <p className="text-sm text-muted-foreground">
                Notes content would go here
              </p>
            </TabsContent>
            <TabsContent value="tasks">
              <p className="text-sm text-muted-foreground">
                Tasks list would go here
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cards Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Name</CardTitle>
              <CardDescription>Technology • San Francisco</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This is a simple card demonstrating the layout and styling
                options available with shadcn/ui cards.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                View
              </Button>
              <Button size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold">Phone:</span> +1 234 567 8900
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Role:</span> Sales Manager
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Company
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Layout Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Utilities</CardTitle>
          <CardDescription>
            Replace MUI Box, Stack, Grid with Tailwind utilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flex Row */}
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Flex Row (Stack direction=&quot;row&quot;)
            </h3>
            <div className="flex gap-2">
              <Button size="sm">Action 1</Button>
              <Button size="sm">Action 2</Button>
              <Button size="sm">Action 3</Button>
            </div>
            <code className="text-xs text-muted-foreground block mt-1">
              className=&quot;flex gap-2&quot;
            </code>
          </div>

          {/* Flex Column */}
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Flex Column (Stack)
            </h3>
            <div className="flex flex-col gap-2 max-w-xs">
              <Button size="sm">First Item</Button>
              <Button size="sm">Second Item</Button>
              <Button size="sm">Third Item</Button>
            </div>
            <code className="text-xs text-muted-foreground block mt-1">
              className=&quot;flex flex-col gap-2&quot;
            </code>
          </div>

          {/* Grid */}
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Grid Layout (Grid container)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-muted p-4 rounded text-center text-sm">
                Item 1
              </div>
              <div className="bg-muted p-4 rounded text-center text-sm">
                Item 2
              </div>
              <div className="bg-muted p-4 rounded text-center text-sm">
                Item 3
              </div>
              <div className="bg-muted p-4 rounded text-center text-sm">
                Item 4
              </div>
            </div>
            <code className="text-xs text-muted-foreground block mt-1">
              className=&quot;grid grid-cols-2 md:grid-cols-4 gap-2&quot;
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground text-center">
          Check <strong>TAILWIND_MIGRATION_GUIDE.md</strong> for complete migration instructions
        </p>
      </div>
    </div>
  );
};
