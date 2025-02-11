import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { useState } from "react";
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
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  type BlogPost,
  type Job,
  type ContactSubmission,
} from "@shared/schema";
import { AlertCircle, CheckCircle2 } from "lucide-react";

function Dashboard() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("blog");

  // Blog Posts Query
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", true],
  });

  // Jobs Query
  const { data: jobs, isLoading: jobsLoading, error: jobsError } = useQuery<Job[]>({
    queryKey: ["/api/jobs", true],
  });

  // Contact Submissions Query
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact-submissions"],
  });

  // Mutations
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
    onError: () => {
      toast({
        title: "Error updating post",
        description: "There was a problem updating the post. Please try again.",
        variant: "destructive",
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
    onError: () => {
      toast({
        title: "Error updating job",
        description: "There was a problem updating the job. Please try again.",
        variant: "destructive",
      });
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
          <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
        </TabsList>

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