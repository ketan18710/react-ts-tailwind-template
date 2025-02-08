import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./App.css";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface User {
  id: number;
  name: string;
  avatar: string;
  story: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayStory, setDisplayStory] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<User | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        const data = await response.json();
        if (isMounted) {
          setUsers(data.users);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          toast.error(
            `Error fetching data: ${
              err instanceof Error ? err.message : "Unknown error"
            }`
          );
          console.error(err);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (displayStory) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [displayStory, displayData]);

  const nextStory = () => {
    if (!displayData) return;
    const currentIndex = users.findIndex((user) => user.id === displayData.id);
    if (currentIndex < users.length - 1) {
      setDisplayData(users[currentIndex + 1]);
    } else {
      setDisplayStory(false);
    }
  };

  const prevStory = () => {
    if (!displayData) return;
    const currentIndex = users.findIndex((user) => user.id === displayData.id);
    if (currentIndex > 0) {
      setDisplayData(users[currentIndex - 1]);
    } else {
      setDisplayStory(false);
    }
  };

  return (
    <div
      data-testid="app-container"
      className="container overflow-hidden bg-gray-100"
    >
      {loading ? (
        <Loader data-testid="loader" />
      ) : (
        <>
          {!displayStory ? (
            <div className="p-4 h-[100vh]" data-testid="story-list">
              <header>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="max-w-[200px]"
                  data-testid="app-logo"
                />
              </header>
              <section>
                <div
                  className="flex items-center justify-start gap-2 overflow-x-auto whitespace-nowrap p-2"
                  data-testid="stories-container"
                >
                  {users?.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        setDisplayStory(true);
                        setDisplayData(user);
                      }}
                      className="flex flex-col items-center min-w-[80px] cursor-pointer"
                      data-testid={`story-${user.id}`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full border-2 border-pink-500"
                        data-testid={`avatar-${user.id}`}
                      />
                      <p
                        className="text-sm mt-2 text-center"
                        data-testid={`username-${user.id}`}
                      >
                        {user.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            displayData && (
              <div
                className="relative h-[100vh] w-[100vw] flex items-center justify-between transition-all duration-300 ease-in-out"
                data-testid="story-view"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
                  <div
                    className="h-1 bg-white"
                    style={{ width: `${progress}%` }}
                    data-testid="progress-bar"
                  ></div>
                </div>
                <div
                  className="absolute top-4 left-4 flex items-center gap-2 bg-opacity-50 p-2 rounded-lg"
                  data-testid="story-profile"
                >
                  <img
                    src={displayData.avatar}
                    alt={displayData.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    data-testid="story-avatar"
                  />
                  <div className="flex flex-col text-white">
                    <p className="font-semibold" data-testid="story-username">
                      {displayData.name}
                    </p>
                    <span className="text-sm opacity-80">Filtered</span>
                  </div>
                </div>
                <button
                  className="absolute top-4 right-4 p-2 bg-gray-800 bg-opacity-50 rounded-full"
                  onClick={() => setDisplayStory(false)}
                  data-testid="close-button"
                >
                  <FaTimes className="text-white text-2xl" />
                </button>
                <img
                  src={displayData?.story}
                  className="w-full h-full object-cover"
                  alt=""
                  data-testid="story-image"
                  onClick={(e) => {
                    const { clientX } = e;
                    if (clientX < window.innerWidth / 2) {
                      prevStory();
                    } else {
                      nextStory();
                    }
                  }}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default App;
