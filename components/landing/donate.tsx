/* eslint-disable @next/next/no-img-element */

import {
    Heart,
    CoffeeIcon,
    GithubIcon,
    BuildingIcon,
} from "lucide-react";

export default async function Donate() {
    const response = await fetch(`https://artisaan-docs-bucket.s3.us-east-1.amazonaws.com/public/static.json`, { cache: "no-store" })

    const data = await response.json();

    const members = data.members;

    const monthlyGoal = data.monthly_goal;
    const goalAchieved = data.goal_achieved;

    return (
        <section id="donate" className="py-24 px-6 border-t border-white/5 relative">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6 bg-blue-500/10 border border-blue-500/20 text-blue-400" >
                        <Heart size={12} />
                        <span className="font-medium">Community Supported</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Powered by You.</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Artisaan is building for you. Your donations keep the parser engines running and fund new features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aura-card p-8 rounded-2xl flex flex-col text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                            <CoffeeIcon size={20} />
                        </div>

                        <h3 className="text-lg font-medium text-white mb-1">
                            Help Maintain the Server
                        </h3>

                        <div className="text-2xl font-semibold tracking-tight mb-4">
                            $1<span className="text-sm font-normal text-gray-500">/donate</span>
                        </div>

                        <p className="text-sm text-gray-500 mb-6 grow">
                            Support basic server costs and get a backer badge on our README.
                        </p>

                        <a href={process.env.NEXT_PUBLIC_STRIPE_DONATE_1} className="cursor-pointer" target="_blank">
                            <button className="w-full py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                                Donate
                            </button>
                        </a>
                    </div>

                    <div className="aura-card p-8 rounded-2xl flex flex-col text-center border-blue-500/30 bg-blue-500/5 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 border border-blue-500/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Most Popular</div>

                        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <GithubIcon size={20} />
                        </div>

                        <h3 className="text-lg font-medium text-white mb-1">
                            GitHub Sponsor
                        </h3>

                        <div className="text-2xl font-semibold tracking-tight mb-4">
                            $5<span className="text-sm font-normal text-gray-500">/donate</span>
                        </div>

                        <p className="text-sm text-gray-400 mb-6 grow">
                            Priority issue triage, early access to new parsers (C#, Go), and private discord access.
                        </p>

                        <a href={process.env.NEXT_PUBLIC_STRIPE_DONATE_2} className="cursor-pointer" target="_blank">
                            <button className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium">
                                Become a Sponsor
                            </button>
                        </a>
                    </div>

                    <div className="aura-card p-8 rounded-2xl flex flex-col text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                            <BuildingIcon size={20} />
                        </div>

                        <h3 className="text-lg font-medium text-white mb-1">
                            Enterprise
                        </h3>

                        <div className="text-2xl font-semibold tracking-tight mb-4">
                            $20+<span className="text-sm font-normal text-gray-500">/donate</span>
                        </div>

                        <p className="text-sm text-gray-500 mb-6 grow">
                            Logo on our homepage, priority roadmap input, and dedicated support channel.
                        </p>

                        <a href={process.env.NEXT_PUBLIC_STRIPE_DONATE_3} className="cursor-pointer" target="_blank">
                            <button className="w-full py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                                Donate
                            </button>
                        </a>
                    </div>
                </div>

                <div className="mt-16 max-w-lg mx-auto">
                    <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                        <span>Monthly Goal</span>
                        <span className="text-white">${goalAchieved} / ${monthlyGoal}</span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-blue-600 to-purple-600" style={{ width: `${(goalAchieved / monthlyGoal) * 100}%` }}></div>
                    </div>

                    <div className="flex justify-center -space-x-2 mt-6">
                        {members && members?.slice(0, 4).map((member: {
                            name: string;
                            github: string;
                            donate: string;
                        }, index: number) => (
                            <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#030304] overflow-hidden"
                                title={member.name}
                            >
                                <img
                                    src={`https://github.com/${member.github}.png?size=64`}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}

                        {
                            members.length > 4 && (
                                <div className="w-8 h-8 rounded-full bg-[#030304] border border-dashed border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-medium pl-1">
                                    +{members.length - 4}
                                </div>
                            )
                        }
                    </div>

                    <p className="text-center text-xs text-gray-600 mt-3">
                        Join {members.length} other sponsors backing Artisaan.
                    </p>
                </div>
            </div>
        </section>
    );
}