import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FTCA_Winner_Teams } from '../Competition/data/ftac';
import { toSlug } from '../../../../utils/toSlug';
import { useState } from 'react';
import { images } from '../../../../assets/images';
import "./Certificate.css";

const Certificate = () => {
    const { teamId, memberSlug } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
      if(teamId && teamId !== null && teamId !== "" && memberSlug && memberSlug !== null && memberSlug !== ""){
        
        const winner_team = FTCA_Winner_Teams.find(winner_team => winner_team.id === parseInt(teamId));
        const member = winner_team?.teamMembers.find(member => toSlug(member.name) === memberSlug);
        setMember(member);
      }
    }, [teamId, memberSlug]);
    
    return (
        <article className='certificate'>
            {
                member && member !== null ? 
                <img src={images[`${teamId}_${member?.id}`]} alt="certificate" /> : 
                ""
            }
        </article>
    )
}

export default Certificate