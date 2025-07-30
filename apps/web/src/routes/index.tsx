import { createFileRoute } from "@tanstack/react-router";
import { TaskManager } from "@/components/tasks/TaskManager";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return <TaskManager />;
}
