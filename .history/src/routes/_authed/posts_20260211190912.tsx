import { useUser } from "@clerk/tanstack-react-start";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { fetchPosts } from "~/utils/posts.js";

export const Route = createFileRoute("/_authed/posts")({
  loader: () => fetchPosts(),
  component: PostsComponent,
});

const useUserId = function () {
  const { user } = useUser();

  if (!user?.id) {
    console.log("undefined!!!!!");
    return "";
  }

  console.log("user!!!");
  return user.id;
};

function PostsComponent() {
  const posts = Route.useLoaderData();
  const userId = useUserId();

  return (
    <div>
      <h3>{userId}</h3>

      <div className="p-2 flex gap-2">
        <ul className="list-disc pl-4">
          {[...posts, { id: "i-do-not-exist", title: "Non-existent Post" }].map(
            (post) => {
              return (
                <li key={post.id} className="whitespace-nowrap">
                  <Link
                    to="/posts/$postId"
                    params={{
                      postId: post.id,
                    }}
                    className="block py-1 text-blue-800 hover:text-blue-600"
                    activeProps={{ className: "text-black font-bold" }}
                  >
                    <div>{post.title.substring(0, 20)}</div>
                  </Link>
                </li>
              );
            },
          )}
        </ul>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}
