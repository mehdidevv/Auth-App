<script>
  import { goto } from "@sapper/app.mjs";
  let name = "",
    email = "",
    password = "";

  const submit = async () => {
    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    await goto("/login");
  };
</script>

<div id="formContent">
  <!-- Register Form -->
  <form on:submit|preventDefault={submit}>
    <input
      bind:value={email}
      type="text"
      id="login"
      class="fadeIn second"
      name="login"
      placeholder="Email"
      required
    />
    <input
      bind:value={name}
      type="text"
      id="login"
      class="fadeIn second"
      name="login"
      placeholder="login"
      required
    />
    <input
      bind:value={password}
      type="text"
      id="password"
      class="fadeIn third"
      name="login"
      placeholder="password"
      required
    />
    <input type="submit" class="fadeIn fourth" value="Register" />
  </form>
</div>

<style>
  #formContent {
    padding-top: 50px;
  }
  #password {
    -webkit-text-security: disc;
  }
</style>
