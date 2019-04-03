<template>
  <v-expansion-panel expand v-model="panel" class="my-2">
    <v-expansion-panel-content>
      <h2 slot="header" class="headline">
        Session {{ overview.sessionNumber }} Overview
      </h2>
      <v-card flat>
        <v-card-text class="text-xs-left">
          <h3 class="subheading text-xs-left">
            Expectations
          </h3>
          <p>{{ overview.expectations }}</p>
          <h3 class="subheading text-xs-left">Role Distribution</h3>
          <v-list two-line subheader>
            <template v-for="(rt, i) in overview.roleDescription">
              <v-list-tile :key="'rt' + i">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <strong>Description:&nbsp;</strong>{{ rt.description }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <strong>Count:&nbsp;</strong>{{ rt.count }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
                v-if="i !== overview.roleDescription.length - 1"
                :key="'rtd' + i"
              />
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ScenarioOverview",
  props: {
    overview: {
      type: Object,
      default: () => ({}),
      required: true
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      panel: [this.expanded]
    };
  }
};
</script>

<style scoped></style>
