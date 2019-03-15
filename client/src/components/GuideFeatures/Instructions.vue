<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <div>
    <Nav />
    <v-toolbar-title></v-toolbar-title>
    <v-container>
      <div>
        <h1 class="headline ">Experiment: {{ scenario.name }}</h1>
        <h1>
          Instructions
        </h1>
        <div>
          Main Content
        </div>
        <div style="text-align-all: left">
          <p>
            The HTML Web Part is used on
            <a href="/sharepoint/page-layouts/home-pages/Pages/default.aspx"
              >Home Pages</a
            >.
          </p>
          <p>
            It is important to review your HTML5 knowledge and reference our
            <a href="/sharepoint/visual-guides/Pages/Basic-HTML-Guide.aspx"
              >HTML Basics Guide</a
            >
            and
            <a href="/sharepoint/visual-guides/Pages/Classes-Guide.aspx"
              >Classes Guide</a
            >
            as well as our
            <a href="/sharepoint/about/best-practices/Pages/html-use.aspx"
              >use guide</a
            >. If you do not feel comfortable editing HTML,
            <a
              href="/sharepoint/sharepoint-basics/Pages/submitting-a-ticket-through-tsc.aspx"
              >put in a TCS ticket</a
            >
            and a Web Comm content administrator will help you.
          </p>
          <h2 class="title">Inserting the HTML Web Part</h2>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            1. Click <strong>Add a Web Part</strong> in the web part area of the
            page layout.
          </p>
          <p></p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            2. Select <strong>HTML Web Part</strong> and click
            <strong>Add</strong>.
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <span style="font-size: inherit; line-height: 1.5;">3. Click </span
            ><strong style="font-size: inherit; line-height: 1.5;"
              >Add New Item</strong
            ><span style="font-size: inherit; line-height: 1.5;">.</span><br />
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <span style="font-size: inherit; line-height: 1.5;"
              >4. Click in the main HTML area, and in the ribbon, click on the </span
            ><strong style="font-size: inherit; line-height: 1.5;">HTML</strong
            ><span style="font-size: inherit; line-height: 1.5;">
              dropdown button. S</span
            ><span style="font-size: 21.76px; line-height: 32.64px;"
              >elect </span
            ><strong style="font-size: 21.76px; line-height: 32.64px;"
              >Edit HTML Source in Rich Text Editor</strong
            ><span style="font-size: 21.76px; line-height: 32.64px;">. </span
            ><span style="font-size: inherit; line-height: 1.5;"
              >This is where you can add your own tags for content. Be sure to
              not add any inline styles that interfere with the stylesheet
              that's already in place on all university websites. </span
            ><span style="font-size: 21.76px; line-height: 32.64px;"
              >See more in the </span
            ><a
              href="/sharepoint/about/best-practices/Pages/html-use.aspx"
              style="font-size: 21.76px; line-height: 32.64px;"
              >HTML use guide</a
            ><span style="font-size: 21.76px; line-height: 32.64px;">.</span>
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <span style="font-size: inherit; line-height: 1.5;"
              >5. Edit it however you see fit, and click </span
            ><strong style="font-size: inherit; line-height: 1.5;">OK</strong
            ><span style="font-size: inherit; line-height: 1.5;">.</span><br />
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <span style="font-size: inherit; line-height: 1.5;"
              >6. Click <b>OK</b> again, and review your content in the Right
              Sidebar.
            </span>
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <strong style="font-size: 21.76px; line-height: 32.64px;"
              >Save & Close</strong
            ><span style="font-size: 21.76px; line-height: 32.64px;"> and </span
            ><strong style="font-size: 21.76px; line-height: 32.64px;"
              >Check In</strong
            ><span style="font-size: 21.76px; line-height: 32.64px;">
              your page. </span
            ><span style="font-size: inherit; line-height: 1.5;"><br /></span>
          </p>
          <p style="font-size: 21.76px; line-height: 32.64px;">
            <span style="font-size: inherit; line-height: 1.5;"><br /></span>
          </p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Nav from "../Nav";

export default {
  name: "Instructions",
  components: { Nav },
  data() {
    return {};
  },
  apollo: {
    scenario: {
      query: gql`
        {
          scenario(code: "APPLMRKT") {
            instructions {
              header
            }
            name
            description

            id
          }
        }
      `,
      result({ data }) {
        // this.$credentials.userId = data.me.id;
        // console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped></style>
