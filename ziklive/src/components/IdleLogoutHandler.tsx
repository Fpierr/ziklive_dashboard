"use client";

import { useIdleLogout } from "@/hooks/useIdleLogout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function IdleLogoutHandler() {
  const { showModal, remaining, stayActive, forceLogout } = useIdleLogout();

  if (!showModal) return null;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Inactivité : Votre session va bientot expiré.</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Vous serez déconnecté dans{" "}
            {minutes > 0 && `${minutes} minute${minutes > 1 ? "s" : ""} `}
            {seconds} seconde{seconds !== 1 ? "s" : ""}.
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={stayActive} variant="outline" className="hover:bg-purple-600">
            Rester connecté(e)
          </Button>
          <Button onClick={forceLogout} variant="destructive" className="hover:bg-red-600">
            Se déconnecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
