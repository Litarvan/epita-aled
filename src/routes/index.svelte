<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export function load() {
        return {
            status: '301',
            redirect: '/a/aled'
        };
    }
</script>

<!-- TODO: Implement error page -->
