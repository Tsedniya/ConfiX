export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/conference.png')" }}
    >
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-left pl-24 max-w-xl">
        <h1 className="text-white mb-6 lg:text-6xl md:text-5xl sm:2xl font-bold leading-tight">
          Elevate Your Events.<span className="text-primary-fixed"> Simple, Powerful Management.</span>
        </h1>
        <p className="text-lg text-white">
          Join the world's leading organizations using Confero to deliver seamless
          experiences for attendees, speakers, and organizers alike.
        </p>

        
        <div className="flex gap-5 mt-5 text-left pl-24 max-w-xl">
                <div className="w-40 py-2 bg-gradient-to-r from-primary-container to-surface-tint text-white rounded font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center">
                  Upcoming Event
                </div>

                <div className="w-40 py-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center">
                  Partner with us
                </div>
         </div>
        
      </div>
    </div>
  );
}