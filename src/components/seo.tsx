import { FunctionComponent } from 'react';
import React, { Helmet } from 'react-helmet';

export const SEO: FunctionComponent<{ title: string }> = ({ title }) => (
  <Helmet titleTemplate="%s | Krzysztof Żuraw">
    <html lang="en" />
    <title>{title}</title>
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏗️</text></svg>"
    />
    <meta name="description" content="Frontend | Design | Coffee" />
  </Helmet>
);
