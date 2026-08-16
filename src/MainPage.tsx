import type { Task } from "wasp/entities";
import { getTasks, useQuery } from "wasp/client/operations"

export const MainPage = () => {
    const { data: tasks, isLoading, error } = useQuery(getTasks);

    return (
        <div>
            {tasks && <TaskList tasks={tasks} />}

            {isLoading && "Loading..."}
            {error && "Error: " + error}
        </div>
    );
};

const TaskView = ({ task }: { task: Task }) => {
    return (
        <div>
            <input type="checkbox" id={String(task.id)} checked={task.isDone} />
            {task.description}
        </div>
    );
};

const TaskList = ({ tasks }: { tasks: Task[] }) => {
    if (!tasks?.length) return <div>NO TASKS</div>

    return (
        <div>
            {tasks.map((task, idx) => (
                <TaskView task={task} key={idx} />
            ))}
        </div>
    )
}