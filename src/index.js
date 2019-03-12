import React from "react";
import addons, { makeDecorator } from "@storybook/addons";

import {
  ORG_KEY,
  ADDON_KEY,
  COMPONENT_NAME_KEY,
  OPTIONS_KEY
} from "./constants";

export const withCompodoc = makeDecorator({
  name: "withCompodoc",
  parameterName: "componentClassName",
  wrapper: (storyFn, context, { parameters, options }) => {
    const channel = addons.getChannel();

    channel.emit(`${ORG_KEY}/${ADDON_KEY}/event`, {
      componentName: parameters
    });
    return storyFn(context);
  }
});

export const configureCompodoc = ({ compodocUrl }) => {
  const channel = addons.getChannel();
  channel.emit(`${ORG_KEY}/${ADDON_KEY}/event`, { compodocUrl });
};
