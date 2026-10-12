<script lang="ts">
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
</script>

<a href="mailto:cenk@kilic.dev" target="_blank" class="pill-link" aria-label="Link for mailing me."><Fa icon={faEnvelope} /> Email</a>
<a href="https://srcs.kilic.dev" target="_blank" class="pill-link" aria-label="Link for GitHub profile."><Fa icon={faGithub} /> GitHub</a>
<a href="https://linkedin.com/in/cenkkilic" target="_blank" class="pill-link" aria-label="Link for Linkedin profile."><Fa icon={faLinkedin} /> LinkedIn</a>
