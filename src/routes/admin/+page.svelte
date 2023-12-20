<script lang="ts">
    import type { Users } from "$lib/types/db";
    import * as Form from "$lib/components/ui/form";
    import { loginSchema } from "./types";
    import type { PageData } from "./$types";

    export let data: PageData;

    let user: Users | null = null;
</script>

<Form.Root method="POST" action="?/login" form={data.form} schema={loginSchema} let:config>
    <Form.Field {config} name="username">
        <Form.Item>
            <Form.Label>Brugernavn</Form.Label>
            <Form.Input />
            <Form.Description>Dit tildelte brugernavn</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Field {config} name="password">
        <Form.Item>
            <Form.Label>Nøgleord</Form.Label>
            <Form.Input type="password" />
            <Form.Description>Dit tildelte brugernavn</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Button>Log ind</Form.Button>
</Form.Root>

{#if user}
    <h1>Velkommen {user.name}</h1>
{/if}
