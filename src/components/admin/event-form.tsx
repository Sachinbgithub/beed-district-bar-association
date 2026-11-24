"use client";

import { useActionState } from "react";
import { createEventAction, type ActionState } from "@/app/actions/admin";
import { fieldClass, primaryButtonClass } from "@/components/admin/admin-ui";

const initial: ActionState = {};

export function EventForm() {
  const [state, action, pending] = useActionState(createEventAction, initial);

  return (
    <form action={action} className="max-w-2xl border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-serif text-lg text-[var(--navy)]">Create event</h2>
      </div>
      <div className="grid gap-4 p-4 sm:p-5">
        <input name="title" placeholder="Title" required className={fieldClass} />
        <textarea
          name="description"
          placeholder="Description"
          className={`${fieldClass} min-h-28`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="venue" placeholder="Venue" className={fieldClass} />
          <input name="startsAt" type="datetime-local" required className={fieldClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <select name="category" defaultValue="Seminar" className={fieldClass}>
            <option>Seminar</option>
            <option>Meeting</option>
            <option>Cultural</option>
            <option>Welfare</option>
            <option>Sports</option>
          </select>
          <input
            name="image"
            placeholder="Image path e.g. /images/gallery/seminar.jpg"
            className={fieldClass}
          />
        </div>
        <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--navy)]">
          <input type="checkbox" name="publish" className="size-4" />
          Publish now and email active members
        </label>
        {state.error ? <p className="text-sm text-[#6b2d22]">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-[#1c4532]">{state.success}</p> : null}
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Saving…" : "Save event"}
        </button>
      </div>
    </form>
  );
}
