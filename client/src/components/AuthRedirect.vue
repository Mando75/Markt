<script>
import { authCheck } from "../config/router";
export default {
  name: "AuthRedirect",
  mounted() {
    authCheck().then(() => this.$router.push("/guide/home"));
  }
};
</script>

<style scoped></style>
