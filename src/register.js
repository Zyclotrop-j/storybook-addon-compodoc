import React from "react";
import { makeDecorator, addons } from "@storybook/addons";

import {
  ORG_KEY,
  ADDON_KEY,
  COMPONENT_NAME_KEY,
  OPTIONS_KEY
} from "./constants";

const styles = {
  compodocFrame: {
    position: "relative",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "99%",
    maxWidth: "767px"
  }
};

class CompodocFrame extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { compodocUrl: null, componentName: null };
  }

  componentDidMount() {
    const { channel } = this.props;

    channel.on(`${ORG_KEY}/${ADDON_KEY}/event`, newState => {
      console.log(newState);
      this.setState(Object.assign({}, this.state, newState));
    });
  }

  render() {
    const { componentName, compodocUrl } = this.state;
    if (compodocUrl && componentName) {
      return (
        <iframe
          style={styles.compodocFrame}
          src={`${compodocUrl}/components/${componentName}.html`}
          scrolling="no"
          frameBorder="0"
        />
      );
    } else {
      return (
        <div style={styles.compodocError}>
          <div>No Compodoc options provided!</div>
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }
}

addons.register(`${ORG_KEY}/${ADDON_KEY}`, api => {
  addons.addPanel(`${ORG_KEY}/${ADDON_KEY}panel`, {
    title: "Compodoc",
    render: () => <CompodocFrame channel={addons.getChannel()} api={api} />
  });
});
