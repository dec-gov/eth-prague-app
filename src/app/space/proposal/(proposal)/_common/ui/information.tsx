"use client"

import { Card, CardContent, CardHeader } from "~/sushi-ui/components/card"
import formatDate from "date-fns/format"
import formatDistance from "date-fns/formatDistance"
import { useSpace } from "~/app/_common/lib/hooks/backend/use-space"
import { useProposal } from "~/app/_common/lib/hooks/backend/use-proposal"
import { useMemo } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/sushi-ui"

interface InformationProps {
  spaceId: number
  proposalId: number
}

export function Information({ spaceId, proposalId }: InformationProps) {
  const { data: space } = useSpace({ spaceId })
  const { data: proposal } = useProposal({ spaceId, proposalId })

  const {
    createdAt,
    createdIn,
    hasStarted,
    startsAt,
    startsIn,
    endsAt,
    endsIn,
    hasEnded
  } = useMemo(() => {
    if (!proposal || !space) return {}

    const createdAtDate = new Date(Number(proposal.date_created) * 1000)
    const createdAt = formatDate(createdAtDate, "HH:mm:ss dd/MM/yyyy")
    const createdIn = formatDistance(createdAtDate, new Date(), {
      addSuffix: true
    })

    const startsAtDate = new Date(
      (Number(proposal.date_created) + space.vote_delay) * 1000
    )
    const startsAt = formatDate(startsAtDate, "HH:mm:ss dd/MM/yyyy")
    const startsIn = formatDistance(startsAtDate, new Date(), {
      addSuffix: true
    })
    const hasStarted = startsAtDate < new Date()

    const endsAtDate = new Date(
      (Number(proposal.date_created) + space.vote_delay + space.vote_duration) *
        1000
    )
    const endsAt = formatDate(endsAtDate, "HH:mm:ss dd/MM/yyyy")
    const endsIn = formatDistance(endsAtDate, new Date(), { addSuffix: true })
    const hasEnded = endsAtDate < new Date()

    return {
      createdAt,
      createdIn,
      startsAt,
      startsIn,
      hasStarted,
      endsAt,
      endsIn,
      hasEnded
    }
  }, [proposal, space])

  if (!proposal || !space) return null

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <h2 className="text-lg">Information</h2>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="font-semibold">Voting system</div>
          <div>
            {proposal.mechanism === 0 ? "Single Option" : "Multiple Options"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Created</div>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger className="underline underline-offset-2 decoration-dotted">
              {createdIn}
            </HoverCardTrigger>
            <HoverCardContent>{createdAt}</HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">
            Voting Start{hasStarted ? "ed" : "s"}
          </div>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger className="underline underline-offset-2 decoration-dotted">
              {startsIn}
            </HoverCardTrigger>
            <HoverCardContent>{startsAt}</HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Voting End{hasEnded ? "ed" : "s"}</div>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger className="underline underline-offset-2 decoration-dotted">
              {endsIn}
            </HoverCardTrigger>
            <HoverCardContent>{endsAt}</HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
    </Card>
  )
}
