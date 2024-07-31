import { useState } from "react";
import { PluggyConnect } from "react-pluggy-connect";
import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/PlugglyContext";

export const Login = () => {
  const { updateAuth } = useAuth();

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/connect-token`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      const data = await response.json();

      if (data) setAccessToken(data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    await getAccessToken();
    setIsWidgetOpen(true);
  };

  const onSuccess = async (itemData: { item: any }) => {
    if (itemData) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/auth/sync-account`,
          {
            method: "POST",
            body: JSON.stringify({ itemId: itemData.item.id }),
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );

        const data = await response.json();

        if (data) {
          updateAuth({ itemId: itemData.item.id, account: data.account });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsWidgetOpen(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader">
          <div className="loader__image">
            <div className="loader__coin">
              <img
                src="https://www.dropbox.com/s/fzc3fidyxqbqhnj/loader-coin.png?raw=1"
                alt=""
                height={50}
                width={50}
              />
            </div>
            <div className="loader__hand">
              <img
                src="https://www.dropbox.com/s/y8uqvjn811z6npu/loader-hand.png?raw=1"
                alt=""
                height={100}
                width={100}
              />
            </div>
          </div>
          <p>Syncing your account...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          {isWidgetOpen && accessToken ? (
            <PluggyConnect
              connectToken={accessToken}
              includeSandbox={true}
              onClose={() => setIsWidgetOpen(false)}
              onSuccess={onSuccess}
            />
          ) : (
            <Button
              onClick={() => {
                handleClick();
              }}
            >
              Connect your bank account
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
