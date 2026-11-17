"use client";

import { useActionState } from "react";
import { uploadGalleryAction, type ActionState } from "@/app/actions/admin";

const initial: ActionState = {};

export function GalleryForm() {
  const [state, action, pending] = useActionState(uploadGalleryAction, initial);

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="grid max-w-xl gap-3 rounded-xl border border-[var(--border)] bg-white p-5"
    >
      <h2 className="font-medium text-[var(--navy)]">Upload photo</h2>
      <input name="title" placeholder="Title" required className="rounded-md border px-3 py-2 text-sm" />
      <input name="caption" placeholder="Caption" className="rounded-md border px-3 py-2 text-sm" />
      <input name="category" placeholder="Category" defaultValue="Members" className="rounded-md border px-3 py-2 text-sm" />
      <input name="file" type="file" accept="image/*" required className="text-sm" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="publish" defaultChecked />
        Publish now
      </label>
      {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-800">{state.success}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
