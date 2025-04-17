# ✅ universal_backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import uuid
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DATA_FILE = "kanban_data.json"

# Initialize a global DataFrame to hold all task data
columns = ["id", "title", "description", "status", "subtasks"]
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        raw = json.load(f)
        df = pd.DataFrame(raw)
else:
    df = pd.DataFrame(columns=columns)


# Models for input/output
class Subtask(BaseModel):
    title: str
    completed: bool

class TaskIn(BaseModel):
    title: str
    description: str
    status: str
    subtasks: List[Subtask] = []

class TaskOut(TaskIn):
    id: str


# Utility to save to disk
def save_df():
    with open(DATA_FILE, "w") as f:
        json.dump(df.to_dict(orient="records"), f, indent=2)


# 🔹 ROUTES 🔹

@app.get("/kanban", response_model=List[TaskOut])
def get_tasks():
    return df.to_dict(orient="records")


@app.post("/kanban", response_model=TaskOut)
def add_task(task: TaskIn):
    global df
    task_id = str(uuid.uuid4())
    new_row = pd.DataFrame([{**task.dict(), "id": task_id}])
    df = pd.concat([df, new_row], ignore_index=True)
    save_df()
    return new_row.iloc[0].to_dict()


@app.put("/kanban/{task_id}", response_model=TaskOut)
def update_task(task_id: str, task: TaskIn):
    global df
    if task_id not in df["id"].values:
        raise HTTPException(status_code=404, detail="Task not found")
    df.loc[df["id"] == task_id, ["title", "description", "status", "subtasks"]] = [
        task.title,
        task.description,
        task.status,
        task.subtasks,
    ]
    save_df()
    return df[df["id"] == task_id].iloc[0].to_dict()


@app.delete("/kanban/{task_id}")
def delete_task(task_id: str):
    global df
    if task_id not in df["id"].values:
        raise HTTPException(status_code=404, detail="Task not found")
    df = df[df["id"] != task_id]
    save_df()
    return {"detail": "Task deleted"}
