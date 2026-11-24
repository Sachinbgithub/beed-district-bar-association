"use client";

import { useActionState } from "react";
import { createBlogAction, type ActionState } from "@/app/actions/admin";
import { fieldClass, primaryButtonClass } from "@/components/admin/admin-ui";

const initial: ActionState = {};

export function BlogForm() {
  const [state, action, pending] = useActionState(createBlogAction, initial);

  return (
    <form action={action} className="max-w-2xl border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-serif text-lg text-[var(--navy)]">Write post</h2>
      </div>
      <div className="grid gap-4 p-4 sm:p-5">
        <input name="title" placeholder="Title" required className={fieldClass} />
        <textarea
          name="body"
          placeholder="Body"
          required
          className={`${fieldClass} min-h-40`}
        />
        <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--navy)]">
          <input type="checkbox" name="publish" className="size-4" />
          Publish now and email active members
        </label>
        {state.error ? <p className="text-sm text-[#6b2d22]">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-[#1c4532]">{state.success}</p> : null}
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Saving…" : "Save post"}
        </button>
      </div>
    </form>
  );
}
