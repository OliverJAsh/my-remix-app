import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import React from "react";

// Note the "action" export name, this will handle our form POST
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const project = { id: 1 };
  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  return (
    <form method="post" action="/projects/new">
      <p>
        <label>
          Name: <input name="name" type="text" />
        </label>
      </p>
      <p>
        <label>
          Description:
          <br />
          <textarea name="description" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
