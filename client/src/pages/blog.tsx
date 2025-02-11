import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type BlogPost } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function Blog() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (error) {
    return (
      <div className="min-h-screen container py-20">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blog Posts</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Knowledge Vault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-center max-w-3xl mx-auto"
          >
            Insights and articles about technology, innovation, and industry trends
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(null).map((_, index) => (
              <Card key={index} className="h-full flex flex-col">
                <Skeleton className="h-48 rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-20 mb-4" />
                  <Skeleton className="h-10" />
                </CardContent>
              </Card>
            ))
          ) : (
            posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  {post.thumbnail && (
                    <div 
                      className="h-48 bg-cover bg-center rounded-t-lg"
                      style={{ backgroundImage: `url(${post.thumbnail})` }}
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-4 mb-4">
                      {post.excerpt || post.content}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Read More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{post.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <div className="prose dark:prose-invert max-w-none">
                            {post.content}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-16">
        <div className="container max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-md px-4 py-2 border bg-background"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;