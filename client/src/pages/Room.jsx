import theLogo from "../assets/img/icon.png";

export default function Room() {
  return (
    <div className="min-h-screen">
      <div className="h-full p-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src={theLogo}
              alt="our logo snugglemeet"
              height={29}
              width={29}
            />
            <h1 className="font-bowldy font-thin text-second tracking-wide text-xl">
              ROOM A
            </h1>
          </div>
          <div>
            <button className="text-sm text-second font-semibold font-alata px-4 border border-2 bg-third border-second">
              LEAVE
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 py-2 items-center w-full px-16 gap-1">
          <button className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2">
            Tile A
          </button>
          <button className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2">
            Tile B
          </button>
          <button className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2">
            Tile C
          </button>
          <button className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2">
            Tile D
          </button>
        </div>
        <p className="font-alata text-sm text-center">
          Powered by <span className="text-forth">injili.tech</span>
        </p>
      </div>
    </div>
  );
}
