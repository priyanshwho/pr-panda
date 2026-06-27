import { CreativePricing } from "@/components/ui/creative-pricing"
import type { PricingTier } from "@/components/ui/creative-pricing"
import { Pencil, Star, Sparkles } from "lucide-react";

const sampleTiers: PricingTier[] = [
    {
        name: "Developer",
        icon: <Pencil className="w-5 h-5" />,
        price: 0,
        description: "For individual developers and small open source projects",
        color: "amber",
        features: [
            "1 Active Repository",
            "50 AI Reviews / Month",
            "Standard Speed Queue",
            "Community Support",
        ],
    },
    {
        name: "Pro",
        icon: <Star className="w-5 h-5" />,
        price: 2499,
        description: "For growing teams that need faster, priority reviews",
        color: "blue",
        features: [
            "Unlimited Public Repos",
            "3 Private Repositories",
            "Priority Review Queue",
            "Custom Guideline Presets",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        icon: <Sparkles className="w-5 h-5" />,
        price: "Custom",
        description: "For organizations with custom security and SLA needs",
        color: "purple",
        features: [
            "Unlimited Private Repos",
            "Custom AI Model Options",
            "Single Sign-On (SSO)",
            "Dedicated SLA & Support",
        ],
    },
];

function CreativePricingDemo() {
    return <CreativePricing tiers={sampleTiers} />
}

export { CreativePricingDemo }
