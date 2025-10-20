import GreetingComponent from '../greeting';

export default {
  title: 'GreetingComponent',
  component: GreetingComponent,
};

export const Default = () => <GreetingComponent url="/api/greet" />;
