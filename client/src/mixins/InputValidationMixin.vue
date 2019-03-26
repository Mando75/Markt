<script>
export default {
  name: "InputValidationMixin",
  data() {
    return {
      textValidationRules: {
        required: value => {
          return !!value || "Required";
        },
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        validLength: length => value => {
          return value.length === length || "Must be 6 characters";
        }
      }
    };
  }
};
</script>

<style scoped></style>
