import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type BlogPost,
  type Job,
  type ContactSubmission,
  type Partner,
  type Client,
  insertPartnerSchema,
  insertClientSchema,
} from "@shared/schema";
import { AlertCircle, CheckCircle2, Plus } from "lucide-react";

function Dashboard() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("blog");
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<number | null>(null);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  // Existing queries
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", true],
  });

  const { data: jobs, isLoading: jobsLoading, error: jobsError } = useQuery<Job[]>({
    queryKey: ["/api/jobs", true],
  });

  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact-submissions"],
  });

  // New queries for partners and clients
  const { data: partners, isLoading: partnersLoading, error: partnersError } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const { data: clients, isLoading: clientsLoading, error: clientsError } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  // Existing mutations
  const togglePostPublish = useMutation({
    mutationFn: async (post: BlogPost) => {
      await fetch(`/api/blog-posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Post updated successfully",
        description: "The post's publish status has been updated.",
      });
    },
  });

  const toggleJobActive = useMutation({
    mutationFn: async (job: Job) => {
      await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !job.isActive }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: "Job updated successfully",
        description: "The job's active status has been updated.",
      });
    },
  });

  // New mutations for partners
  const addPartner = useMutation({
    mutationFn: async (data: z.infer<typeof insertPartnerSchema>) => {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add partner");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      setIsAddingPartner(false);
      toast({
        title: "Partner added successfully",
      });
    },
  });

  const updatePartner = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<z.infer<typeof insertPartnerSchema>> }) => {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update partner");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      setEditingPartnerId(null);
      toast({
        title: "Partner updated successfully",
      });
    },
  });

  const deletePartner = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete partner");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Partner deleted successfully",
      });
    },
  });

  // New mutations for clients
  const addClient = useMutation({
    mutationFn: async (data: z.infer<typeof insertClientSchema>) => {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add client");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setIsAddingClient(false);
      toast({
        title: "Client added successfully",
      });
    },
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<z.infer<typeof insertClientSchema>> }) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update client");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setEditingClientId(null);
      toast({
        title: "Client updated successfully",
      });
    },
  });

  const deleteClient = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete client");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      toast({
        title: "Client deleted successfully",
      });
    },
  });

  const partnerForm = useForm({
    resolver: zodResolver(insertPartnerSchema),
    defaultValues: {
      name: "",
      website: "",
      logo: "",
      description: "",
      order: 1,
      isActive: true,
    },
  });

  const clientForm = useForm({
    resolver: zodResolver(insertClientSchema),
    defaultValues: {
      name: "",
      website: "",
      logo: "",
      description: "",
      order: 1,
    },
  });

  const LoadingTable = () => (
    <div className="space-y-4">
      {Array(5).fill(null).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8 text-destructive">
      <AlertCircle className="mr-2 h-4 w-4" />
      <p>{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
        </TabsList>

        {/* Existing tabs content */}
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {postsError ? (
                <ErrorMessage message="Failed to load blog posts" />
              ) : postsLoading ? (
                <LoadingTable />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts?.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.isPublished
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}>
                            {post.isPublished ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(post.publishedAt), "PP")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => togglePostPublish.mutate(post)}
                            disabled={togglePostPublish.isPending}
                          >
                            {togglePostPublish.isPending ? "Updating..." : "Toggle Publish"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              {jobsError ? (
                <ErrorMessage message="Failed to load jobs" />
              ) : jobsLoading ? (
                <LoadingTable />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs?.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }`}>
                            {job.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => toggleJobActive.mutate(job)}
                            disabled={toggleJobActive.isPending}
                          >
                            {toggleJobActive.isPending ? "Updating..." : "Toggle Active"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Partners tab */}
        <TabsContent value="partners">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Partners</CardTitle>
              <Button
                onClick={() => setIsAddingPartner(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Partner
              </Button>
            </CardHeader>
            <CardContent>
              {partnersError ? (
                <ErrorMessage message="Failed to load partners" />
              ) : partnersLoading ? (
                <LoadingTable />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners?.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{partner.website}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            partner.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }`}>
                            {partner.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>{partner.order}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setEditingPartnerId(partner.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deletePartner.mutate(partner.id)}
                            disabled={deletePartner.isPending}
                          >
                            {deletePartner.isPending ? "Deleting..." : "Delete"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Partner Dialog */}
          <Dialog
            open={isAddingPartner || editingPartnerId !== null}
            onOpenChange={() => {
              setIsAddingPartner(false);
              setEditingPartnerId(null);
              partnerForm.reset();
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isAddingPartner ? "Add Partner" : "Edit Partner"}
                </DialogTitle>
              </DialogHeader>

              <Form {...partnerForm}>
                <form
                  onSubmit={partnerForm.handleSubmit((data) => {
                    if (editingPartnerId) {
                      updatePartner.mutate({ id: editingPartnerId, data });
                    } else {
                      addPartner.mutate(data);
                    }
                  })}
                  className="space-y-4"
                >
                  <FormField
                    control={partnerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={partnerForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={partnerForm.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={partnerForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={partnerForm.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={addPartner.isPending || updatePartner.isPending}
                    >
                      {addPartner.isPending || updatePartner.isPending
                        ? "Saving..."
                        : "Save Partner"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* New Clients tab */}
        <TabsContent value="clients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Clients</CardTitle>
              <Button
                onClick={() => setIsAddingClient(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Client
              </Button>
            </CardHeader>
            <CardContent>
              {clientsError ? (
                <ErrorMessage message="Failed to load clients" />
              ) : clientsLoading ? (
                <LoadingTable />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients?.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.website}</TableCell>
                        <TableCell>{client.order}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setEditingClientId(client.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteClient.mutate(client.id)}
                            disabled={deleteClient.isPending}
                          >
                            {deleteClient.isPending ? "Deleting..." : "Delete"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Client Dialog */}
          <Dialog
            open={isAddingClient || editingClientId !== null}
            onOpenChange={() => {
              setIsAddingClient(false);
              setEditingClientId(null);
              clientForm.reset();
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isAddingClient ? "Add Client" : "Edit Client"}
                </DialogTitle>
              </DialogHeader>

              <Form {...clientForm}>
                <form
                  onSubmit={clientForm.handleSubmit((data) => {
                    if (editingClientId) {
                      updateClient.mutate({ id: editingClientId, data });
                    } else {
                      addClient.mutate(data);
                    }
                  })}
                  className="space-y-4"
                >
                  <FormField
                    control={clientForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={clientForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={clientForm.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={clientForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={clientForm.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={addClient.isPending || updateClient.isPending}
                    >
                      {addClient.isPending || updateClient.isPending
                        ? "Saving..."
                        : "Save Client"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Contacts tab */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submissionsError ? (
                <ErrorMessage message="Failed to load contact submissions" />
              ) : submissionsLoading ? (
                <LoadingTable />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions?.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone || "N/A"}</TableCell>
                        <TableCell>
                          {format(new Date(submission.createdAt), "PP")}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">View Message</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Message from {submission.name}</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                <p className="whitespace-pre-wrap">
                                  {submission.message}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;