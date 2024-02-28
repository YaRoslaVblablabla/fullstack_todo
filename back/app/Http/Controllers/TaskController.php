<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\Task;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function list(){
        $tasks = Task::all();
        return TaskResource::collection( $tasks);
    }

    public function store(StoreRequest $request){
        $data = $request->validated();
        $task = Task::create($data);
        return new TaskResource($task);
    }

    public function changeStatus(Task $task, Request $request){
        $task->update(['status' => $request[0]]);
        return $task;
    }

    public function updateTask(Task $task, UpdateRequest $request){
        $data = $request->validated();
        $data['changed'] = true;
        $task->update($data);
        return new TaskResource($task);
    }

    public function clearTrash(){
        Task::where('status', 'delete')->delete();
        return 1;
    }

    public function activeAll(){
        Task::where('status', 'complite')->update(['status' => 'active']);
        return 2;
    }
}
