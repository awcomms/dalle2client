<script lang='ts'>
	import SideNavLink from './SideNavLink.svelte';
	// import { page } from "$app/stores";
	// import url8 from "$lib/util/url8";
	import { navigating } from '$app/stores';
	// import Login from '$lib/components/Login.svelte'
	import { isSideNavOpen, loginOpen, token, /*user*/ } from '$lib/store';
	import {
		InlineLoading,
		SkipToContent,
		SideNavItems,
		SideNav,
		Header
	} from 'carbon-components-svelte';

	let show = false;
	let installPrompt: BeforeInstallPromptEvent;

	type UserChoice = Promise<"accepted" | "dismissed">;

	interface BeforeInstallPromptEvent extends Event {
		platforms: string[],
		userChoice: UserChoice,
		prompt: () => Promise<{userChoice: UserChoice, platforms: string[]}>
	}

	const installed = () => {
		show = false;
	};

	const before = (e: BeforeInstallPromptEvent) => {
		show = true;
		e.preventDefault();
		installPrompt = e;
	};

	const install = () => {
		installPrompt.prompt();
		installPrompt.userChoice.then((choice) => {
			if (choice === 'accepted') {
				show = false;
			}
		});
	};

	/*
  const getSub = () => {
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.pushManager.getSubscription().then(async (sub) => {
          if (sub) {
            return sub;
          }

          const response = await fetch(`get`);
          const vapidKey = await response.text();
          let int8VapidKey = url8(vapidKey);
          const options = {
            userVisibleOnly: true,
            applicationServerKey: int8VapidKey,
          };
          return registration.pushManager.subscribe(options);
        });
      })
      .then((sub) => {
        api.post("subs", { id: $user.id, sub: sub });
      });
  };

  if (typeof window != "undefined") {
    if (navigator && navigator.serviceWorker && $user) {
      getSub();
    }
  }
  */

	const exit = () => {
		$token = ""
	};
</script>

<!-- <Login /> -->


<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

<Header
	persistentHamburgerMenu={true}
	company="Quiz"
	bind:isSideNavOpen={$isSideNavOpen}
	href="/"
>
	{#if $navigating}
		<InlineLoading />
	{/if}
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
</Header>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<!-- <SideNavLink text="Events" />
		<SideNavLink text="About" />
		<SideNavLink text="Fees" />
		<SideNavLink text="Newsletter" />
		<SideNavLink text="Contact" />
		<SideNavMenu text="Extracurricular">
			<SideNavMenu text="Clubs">
				<SideNavLink menuItem text="JET" href="/extracurricular/clubs/jet" />
			</SideNavMenu>
			<SideNavLink menuItem text="Chess" href="/extracurricular/chess" />
			<SideNavLink menuItem text="Sports" href="/extracurricular/sports" />
		</SideNavMenu> -->
		{#if show}
			<SideNavLink on:click={install} href={null} text="Add To Homescreen" />
		{/if}
		<!-- {#if $user} -->
			<!-- <SideNavLink text="Current result" href="result" /> -->
			<!-- {#if $user.role === 'admin'}
				<SideNavLink text="Results" />
				<SideNavLink text="Add Images" />
			{/if} -->
			<!-- <SideNavLink text="Edit Profile" href="/profile/edit" />
			<SideNavLink text="Logout" href={null} on:click={exit} /> -->
		<!-- {:else} -->
			<!-- <SideNavLink href={null} on:click={()=> $loginOpen = true} text="Login" /> -->
		<!-- {/if} -->
		<SideNavLink text="Completions" />
		<!-- {#if $user}
      <SideNavLink isSelected={$page.url.pathname === `/u/${$user.username}`} text="Me" href="/u/{$user.username}" />
      <SideNavLink href="/edit" text="Edit Profile" />
      <SideNavLink text="Exit" href={null} on:click={exit} />
    {/if} -->
	</SideNavItems>
</SideNav>
