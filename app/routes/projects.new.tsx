import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useActionData } from "@remix-run/react";
import React from "react";

// Note the "action" export name, this will handle our form POST
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const project = { id: 1 };

  const errors = {
    name: "Name is required",
    description: "Description is required",
  };

  if (errors) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  const actionData = useActionData<typeof action>();

  return (
    <form method="post" action="/projects/new">
      <p>
        <label>
          Name:{" "}
          <input
            name="name"
            type="text"
            defaultValue={actionData?.values.name}
          />
        </label>
      </p>

      {actionData?.errors.name ? (
        <p style={{ color: "red" }}>{actionData.errors.name}</p>
      ) : null}

      <p>
        <label>
          Description:
          <br />
          <textarea
            name="description"
            defaultValue={actionData?.values.description}
          />
        </label>
      </p>

      {actionData?.errors.description ? (
        <p style={{ color: "red" }}>{actionData.errors.description}</p>
      ) : null}

      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
