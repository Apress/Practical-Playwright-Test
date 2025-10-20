import { useState } from 'react';

function GreetingComponent({ url }: { url: string }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [greeting, setGreeting] = useState('');

  const fetchGreeting = async (url: string) => {
    setButtonClicked(true);

    // Fake fetching for demo purposes
    const randomTime = Math.random() * 3_000;
    const result = await new Promise<string>((resolve) =>
      setTimeout(() => resolve('hello there'), randomTime),
    );

    setGreeting(result);
  };

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        Load Greeting
      </button>
      {greeting && <h1>{greeting}</h1>}
    </div>
  );
}

export default GreetingComponent;
