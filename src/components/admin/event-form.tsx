"use client";

import { useActionState } from "react";
import { createEventAction, type ActionState } from "@/app/actions/admin";

const initial: ActionState = {};

export function EventForm() {
  const [state, action, pending] = useActionState(createEventAction, initial);

  return (
    <form action={action} className="grid max-w-xl gap-3 rounded-xl border border-[var(--border)] bg-white p-5">
      <h2 className="font-medium text-[var(--navy)]">Create event</h2>
      <input name="title" placeholder="Title" required className="rounded-md border px-3 py-2 text-sm" />
      <textarea
        name="description"
        placeholder="Description"
        className="min-h-24 rounded-md border px-3 py-2 text-sm"
      />
      <input name="venue" placeholder="Venue" className="rounded-md border px-3 py-2 text-sm" />
      <input
        name="startsAt"
        type="datetime-local"
        required
        className="rounded-md border px-3 py-2 text-sm"
      />
      <select name="category" defaultValue="Seminar" className="rounded-md border px-3 py-2 text-sm">
        <option>Seminar</option>
        <option>Meeting</option>
        <option>Cultural</option>
        <option>Welfare</option>
        <option>Sports</option>
      </select>
      <input
        name="image"
        placeholder="Image path e.g. /images/gallery/seminar.jpg"
        className="rounded-md border px-3 py-2 text-sm"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="publish" />
        Publish now and email active members
      </label>
      {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-800">{state.success}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white"
      >
        {pending ? "Saving…" : "Save event"}
      </button>
    </form>
  );
}
