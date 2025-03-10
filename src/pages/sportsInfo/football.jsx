import { Button } from '@mui/material';
import React, { useRef } from 'react'
import Footer from '../../components/footer';
import { ArrowDownNarrowWide, LucideArrowBigDown, LucideArrowBigUp, LucideArrowBigUpDash, LucideArrowDownNarrowWide } from 'lucide-react';
import { FaRobot } from 'react-icons/fa';

const Football = () => {
    const sectionOneRef = useRef(null);
    const sectionTwoRef = useRef(null);
    const sectionThreeRef = useRef(null);
    const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <>
        <nav style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'white', marginBottom:'20px'}}>
            <Button onClick={() => scrollToSection(sectionOneRef)}>Positions</Button>
            <Button onClick={() => scrollToSection(sectionTwoRef)}>Injuries</Button>
        </nav>
        <h1 ref={sectionOneRef} style={{fontSize:'50px', fontWeight:'bolder'}}>Positions</h1>
        <div style={{borderBottom: '2px solid black' , height:'20px'}}>

        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Goalkeeper</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            Goalkeeper is the most defensive position in football. The goalkeeper's main job is to stop the other team from scoring by catching, palming or punching the ball from shots, headers and crosses. Unlike their teammates, goalkeepers typically remain in and around their own penalty area for most of the game. As a result, goalkeepers have a better view of the pitch and often give advice to their defence when the other team is on the attack or during set pieces. Goalkeepers are the only players on the pitch who are allowed to handle the ball, but this is restricted to their own penalty area. Positioning is another important job and is one of the hardest to master as keeper.
            <br />
            Goalkeepers must also wear a different coloured kit from the outfielders and officials. Common colours include yellow, green, grey, black and shades of blue. Since the 1970s, goalkeepers have also typically worn specialised gloves. They provide better grip on the ball and protect their hands from hard shots and headers, as well making it easier to punch or push the ball away. Caps were common between the 1910s and 1960s, as well as woolly jumpers, but these are not worn in any professional or semi-professional context today.
            <br />
            Unlike other positions, the goalkeeper is the only required role in a football match. If a goalkeeper gets sent off or injured, a substitute goalkeeper must take their place in goal. If that is not possible, an outfielder must do so and wear the goalkeeper's shirt. This happened in the 2023 NWSL Championship final, when goalkeeper Mandy Haught was sent off with a red card, and her team already reached the limit of substitutions, causing midfielder Nealy Martin to take her place as goalkeeper.            
            </p>
        </div>
        <br />
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Sweeper-keeper</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            With the advent of the offside rule, the role of a sweeping defender has largely become obsolete. However, in the last decades it has become popular for goalkeepers to take on that role instead. A sweeping goalkeeper is good at reading the game, and prevents scoring opportunities by coming off their line to challenge and/or distract opposing forwards who have beaten the offside trap. Manuel Neuer has often been described as a sweeper-keeper.            
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Centre-back</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The principal role of the centre-back, (or central defender) (historically called a centre-half) is to block the opponent's players from scoring, and safely clearing the ball from the defensive half's penalty area. As their name suggests, they play in a central position. Most teams employ two centre-backs, stationed in front of the goalkeeper. There are two main defensive strategies used by centre-backs: the zonal defence, where each centre-back covers a specific area of the pitch, and man-to-man marking, where each centre-back has the job of covering a particular opposition player.
            <br />
            Centre-backs are often tall, strong and have good jumping, heading and tackling ability. Successful centre-backs also need to be able to concentrate, read the game well, and be brave and decisive in making last-ditch tackles on attacking players who might otherwise be through on goal. Sometimes, particularly in lower leagues, centre-backs concentrate less on ball control and passing, preferring simply to clear the ball in a "safety-first" fashion. However, there is a long tradition of centre-backs having more than just rudimentary footballing skill, enabling a more possession-oriented playing style.
            <br />
            Centre-backs will usually go forward for set piece corners and free-kicks, where their height and jumping ability give them an aerial goal threat, while defensive duties are covered by the full-backs. Once the set piece is complete, they will retreat to their own half.
            <br />
            The position is sometimes referred to as "centre-half". This originates in the late part of the 19th century, when most teams employed the 2-3-5 formation, the row of three players were called half-backs. As formations evolved, the central player in this trio (the centre-half), moved into a more defensive position on the field, taking the name of the position with them.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Sweeper</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The sweeper (or libero (Italian: free)) is a more versatile type of centre-back that, as the name suggests, "sweeps up" the ball if the opponent manages to breach the defensive line. Their position is rather more fluid than other defenders who mark their designated opponents. The sweeper's ability to read the game is even more vital than for a centre-back. The catenaccio system of play, used in Italian football in the 1960s, notably employed a defensive libero. With the advent of the modern offside rule came the need to hold more of a defensive line to catch opposing players offside. Use of a sweeper role became less popular as the last man can play an attacking opponent onside, which could in the case of the sweeper be behind the main defence. Nowadays, the position is commonly taught in American and Italian youth football, with most teams elsewhere never playing the position.
            <br />
            Former German captain Franz Beckenbauer is commonly seen as the inventor of the libero and the best player in the role. However, players such as Velibor Vasović and Armando Picchi were prominent sweepers prior to Beckenbauer. Some of the greatest sweepers were Gaetano Scirea, Bobby Moore, Franco Baresi, Daniel Passarella and Lothar Matthäus.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Full-back</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The left-back and the right-back (generally referred to as the full-backs) are the defenders stationed at either side of the centre-backs to provide protection from attacking wide players. They often have to defend against the opponent's wingers, who will try to take the ball past them down the flanks in order to cross or pass into the penalty area to their attackers. Full-backs traditionally do not go up to support the attack but may move up as far as the halfway line depending on the defensive line being held. In the modern game, there has been the tendency to prefer the use of the attacking full-back (wing-back) role though they are more often than not still referred to as right- or left-backs.
            <br />
            Originally, a full-back was the last line of defence, but as the game developed in the early 20th century, the centre-half role was dropped backwards and came to be known as 'centre-back', and the full-backs were then pushed out wider to create the right-back and left-back positions.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Wing-back</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The wing-backs (or attacking full-backs) are defenders with a more advanced emphasis on attack. The name is a portmanteau of "winger" and "full-back", indicating greater emphasis on their responsibilities in attack.[32] They are usually employed as part of a 3-5-2 formation, and can therefore be considered part of the midfield when a team is attacking. They may also be used in a 5-3-2 formation and therefore have a more defensive role. The term "wing-back" itself is gradually falling out of use as there is less of a distinction with the full-back roles in the modern game, especially when used in a 4-3-3 or 4-2-3-1 formation.
            <br />
            The wing-back role is one of the most physically demanding positions in modern football. Wing-backs are often more adventurous than traditional full-backs and are expected to provide width, especially in teams without wingers. A wing-back needs to be of exceptional stamina, be able to provide crosses upfield and then defend effectively against an opponent's attack down the flanks. A defensive midfielder is usually fielded to cover the advances of an opponent's wing-back.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Central midfielder</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The central midfielder provides a link between defence and attack, fulfilling a number of duties and operating primarily in the middle third of the pitch. They will support their team's attacking play and endeavour to win the ball back on defense. A central midfielder is often an important initiator of attacks and can be sometimes described as a "playmaker." They will also offer an additional line of defence when the team is under sustained attack and when defending set pieces. Central midfielders are always busy in a game and are therefore sometimes described as the engine room of the team.
            <br />
            Their central position enables them to have an all-round view of the match. Since most of the action takes place in and around their area of the pitch, midfielders often exert the greatest degree of control over how a match is played. It is often said that a match is won or lost in midfield, meaning that whichever team dominates the middle area of the pitch is able to dictate the game. A central midfielder is expected to have good vision, be adept at long and short passing and have great stamina because of the ground they cover in a game. They also need to be good at tackling to win the ball back.
            <br />
            Over time two additional central midfield roles have developed from the standard role, though their duties have a degree of overlap. These are the attacking midfield and defensive midfield roles and are explained in the sections below. Depending on the team's tactics a combination of all three roles may be deployed in midfield. Sometimes a central midfielder will be used in a wide midfield role to provide width or as cover.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Defensive midfielder</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            A defensive midfielder (holding midfielder or midfield anchor) is a central midfielder who is stationed in front of the defenders to provide more defensive protection, thus "holding back" when the rest of the midfield supports the attack. The defensive midfielder screens the defence by harrying and tackling the opposition teams' attackers and defenders. They also help tactically, for instance, by directing opposing attacking players out to the wing where they have more limited influence, and by covering the positions of full-backs, other midfielders and even the centre-backs if they charge up to support the attack.
            <br />
            Although the duties of defensive midfielders are primarily defensive, some midfielders are deployed as deep-lying playmakers, due to their ability to dictate tempo from a deep position with their passing. Sometimes a defensive midfielder will be paired with a central midfielder who will act as the deep-lying playmaker. Whenever the central midfielder ventures forward the defensive midfielder will hold back.
            <br />
            Defensive midfielders require good positional sense, work rate, tackling ability, and anticipation (of player and ball movement) to excel. They also need to possess good passing skills and close control to hold the ball in midfield under sustained pressure. Most importantly, defensive midfielders require great stamina as they are the outfield players who cover the greatest distance during a professional match. In top football clubs, a midfielder may cover up to 12 kilometres for a full 90-minute game. Deep-lying playmakers typically require a good first touch under opposition pressure and the ability to play long crossfield passes to attacking players further upfield.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Attacking midfielder</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            An attacking midfielder is a midfield player who is positioned in an advanced midfield position, usually between central midfield and the team's forwards, and who has a primarily offensive role.
            <br />
            According to positioning along the field, attacking midfield may be divided into left, right and central attacking midfield roles. A central attacking midfielder may be referred to as a playmaker, or number ten (due to the association of the number 10 shirt with this position).
            <br />
            These players typically serve as the offensive pivot of the team, and are sometimes said to be "playing in the hole", although this term can also be used to describe the positioning of a deep-lying forward. Their main role is to create goal-scoring opportunities using superior vision, control, and technical skill. The attacking midfielder is an important position that requires the player to possess superior technical abilities in terms of passing and, perhaps more importantly, the ability to read the opposing defence in order to deliver defence-splitting passes to the strikers; in addition to their technical and creative ability, they are also usually quick, agile, and mobile players, which aids them in beating opponents during dribbling runs.
            <br />
            Some attacking midfielders are called trequartistas or fantasisti (Italian: three-quarter specialist, i.e. a playmaker between the forwards and the midfield), known for their deft touch, vision, ability to shoot from range, and passing prowess. However, not all attacking midfielders are trequartistas - some attacking midfielders are very vertical and are essentially auxiliary attackers, i.e. secondary striker. In Brazil, the offensive playmaker is known as the "meia atacante", whereas in Argentina, it is known as the "enganche".
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Wide midfielder</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            A wide midfielder (left midfield and right midfield, or generally side midfielder) (historically called left-half and right-half, or wing-half) is a midfielder who is stationed to the left or right of central midfield. Though they are often referred to as wingers, not all players in these positions are stereotypical speedy, touchline hugging players. With the advent of the modern game the traditional outside forwards known as "wingers" were pushed back to wide midfield, though still commonly referred to as wingers. As the game has developed further, some tactical formations (for example, 4-3-3) have used central midfielders deployed in a wider position to provide width, more defensive protection along the flanks and to help compress play in the opponent's half. They will still support attacking play and sometimes be expected to act as a semi-winger.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Forward</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            Forwards (or strikers) are players who are positioned nearest to the opposing team's goal. The primary responsibility of forwards is to score goals and to create scoring chances for other players. Forwards may also contribute defensively by harrying opposition defenders and goalkeepers whilst not in possession. The most common modern formations include between one and three forwards; for example, a lone striker in a 4–2–3–1, paired strikers in a 4–4–2 or a striker and two wingers in a 4-3-3.
            <br />
            Coaches will often field one striker who plays on the shoulder of the last opposing defender and another attacking forward who plays somewhat deeper and assists in creating goals as well as scoring. The former is sometimes a large striker, typically known as a "target man", who is used either to distract opposing defenders to help teammates score, or to score themselves; the latter is usually of quicker pace, and is required to have some abilities like finding holes in the opposing defence and, sometimes, dribbling. In other cases, strikers will operate on the wings of the field and work their way goalwards. Yet another variation is the replacement of the target man with a striker who can thread through-balls.
            <br />
            Players who specialise in playing as a target are usually of above-average height with good heading ability and an accurate shot. They tend to be the "outlet" player for both midfielders and defenders, able to "hold the ball up" (retain possession of the ball in an advanced position while teammates run forward to join the attack). They tend to score goals from crosses, often with the head, and can use their body strength to shield the ball while turning to score.
            <br />
            Other forwards may rely on their pace to run onto long balls passed over or through the opposition defence, rather than collecting the ball with their back to goal like a target man. Some forwards can play both of these roles equally well.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Second Striker</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            The second striker has a long history in the game, but the terminology to describe them has varied over the years. Originally such players were termed inside forwards. More recently, the preferred terms have been second striker, support striker, deep-lying forward, shadow striker, or withdrawn striker, and are often referred to as playing "in the hole" (i.e. the space between the midfield and the defence of the opposing team). Second strikers tend not to be as tall or as physically imposing as a centre forward. They are required to be more "nippy", quick, mobile, and skillful, helping to create goals and scoring opportunities for centre forwards, utilising spaces created in the opposition's defence to provide passes to the strikers, picking up loose balls around the area, or attempting to dribble with the ball and score themselves.
            <br />
            The position was initially developed by the famous Hungary national team of the late 1940s and mid-1950s led by Ferenc Puskás. Later, it was popularised in Italian football as the trequartista ("three-quarters") or fantasista, the advanced playmaker who plays neither in midfield nor as a forward, but effectively pulls the strings for their team's attack, and serves as an assist provider. Many players in this position can play in a free role, as an attacking midfielder or sometimes on the wing. The position has also been known as the number 10 role, as many players who played in this position wore the number 10 jersey.
            <br />
            Whatever the terminology, the position itself is a loosely defined one, a player who lies somewhere between the out-and-out striker and the midfield, who can perform this role effectively due to their vision, technical skills, creativity, and passing ability. Such a player is either a skillful, attack-minded midfielder or a creative striker who can both score and create opportunities for centre forwards, although a second striker will often not be involved in build-up plays as much as an attacking midfielder. As the supporting forward role was popularised in Italy due to free-role attacking midfielders adapting to a more advanced position in the tactically rigorous 4–4–2 formations of the 1990s, their defensive contribution is also usually higher than that of a pure number ten playmaker. In Italy, this role is also known as a "rifinitore" or "seconda punta", whereas in Brazil, it is known as a "ponte de lança".            
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Centre forward</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            A centre forward has the key task of scoring goals and for this reason acts as the focal point of the majority of attacking play by a team. As such, how well a striker is performing tends to be measured purely on goals scored despite the fact that they may be contributing in other ways to a team's success. A traditional centre forward was required to be tall in height and strong physically in order to be able to win the ball in the area from crosses and attempt to score with either their feet or head, or to knock the ball down for a teammate to score. Whilst these assets are still an advantage, in the modern game speed and movement are also required as there is more interplay when attacking. In a 4-4-2 or 4-4-1-1 formation the centre forward is often paired with a second striker who may play around them or in a slightly withdrawn role respectively, though it is not unknown to play two recognised centre forwards.
            <br />
            Sometimes a team may opt on a more defensive formation such as 4-5-1 in which the centre forward is required to play a "lone role" up front. In these cases a team may look for opportunities to counter-attack on the break and the centre forward may find themselves attacking the goal on their own with just a defender to beat or alternatively they may hold the ball up in the opponent's half to allow other players to join in the attack. Modern footballing tactics have made more use of 4–3–3 and 4–2–3–1 formations. Here the centre forward may be involved more with the attacking build up play, supported by wingers (who often come infield) and attacking midfielders. The play uses more shorter, quick passes with movement off the ball, looking to create an opening on goal.
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Winger</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            A winger (left winger and right winger) (historically called outside-left and outside-right, or outside forward) is an attacking player who is stationed in a wide position near the touchlines. They can be classified as forwards, considering their origin as the old outside forward who played out on the "wing" (i.e. side of the pitch). They continue to be termed as such in many parts of the world, especially in Latin and Dutch footballing cultures. However, in the English-speaking world, they are usually counted as part of the midfield having been pushed back there with the advent of the 4–4–2 formation which gradually rose to prominence in the 1960s, given the role's additional defensive duties. A winger's main attribute is usually speed which is used to attack and dribble past opponent's full-backs in order to get behind the defence and to then deliver crosses and passes into the centre for their attackers.[63] Occasionally left and right footed wingers may swap sides of the field as a tactical move to enable the winger to cut inside against the opposing full-back's weaker foot, looking for a shooting opportunity or just as a means of opening up the defence. Clubs such as Barcelona and Real Madrid often choose to play their wingers on the 'wrong' flank for this reason.
            <br />
            Although wingers are a familiar part of football, the use of wingers is by no means universal, and many successful teams have operated without wingers. At the 1966 World Cup, England manager Alf Ramsey led a team without natural wingers to the title; this was unusual enough at the time for the team to be nicknamed "The Wingless Wonders". A more recent example is that of Italian club Milan, who have typically played in a narrow midfield diamond formation or in a "Christmas tree" formation (4–3–2–1), relying on attacking full-backs to provide the necessary width down the wings.            
            </p>
        </div>
        <h1 ref={sectionTwoRef} style={{fontSize:'50px', fontWeight:'bolder'}}>Injuries</h1>
        <div style={{borderBottom: '2px solid black' , height:'20px'}}>

        </div>
        <br />
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Ankle Sprain</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            <strong>Overview:</strong>
            <br />
            Ankle sprains are one of the most common injuries in football, caused by sudden twists, direction changes, or direct impacts to the ankle joint.
            <br />
            <strong>Symptoms:</strong>
            <br />
            Pain and swelling around the ankle joint.
            <br />
            Bruising around the injured area.
            <br />
            Difficulty walking or bearing weight on the foot.
            <br />
            Tenderness when pressing on the ligaments or joint.
            <br />
            Limited range of motion in the ankle.
            <br />
            <strong>Treatment:</strong>
            <br />
            Rest: Avoid putting weight on the injured ankle.
            <br />
            Ice: Apply ice to the ankle for 15-20 minutes every 2-3 hours during the first 48 hours to reduce swelling.
            <br />
            Compression: Use an elastic bandage to reduce swelling and provide stability.
            <br />
            Elevation: Raise the ankle above heart level to reduce swelling.
            <br />
            Physical Therapy: Once the pain reduces, start strengthening exercises to prevent future injuries.
            <br />
            Pain Relief: NSAIDs (e.g., ibuprofen) can help with pain and swelling.   
            <br />         
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>ACL (Anterior Cruciate Ligament) Tear</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            <strong>Overview:</strong>
            <br />
            The ACL is a crucial ligament in the knee that helps stabilize the joint. Tears often occur during sudden stops, changes in direction, or high-impact collisions.
            <br />
            <strong>Symptoms:</strong> 
            <br />
            A loud popping sound at the time of injury.  
            <br />               
            Severe pain in the knee.
            <br />
            Swelling within a few hours of the injury.
            <br />
            A feeling of instability or "giving way" when trying to walk or stand.
            <br />
            Difficulty bending or straightening the knee.
            <br />
            <strong>Treatment:</strong>
            <br />
            Rest: Avoid putting weight on the knee.
            <br />
            Ice: Apply ice to the knee to control swelling.
            <br />
            Compression: Use a knee brace or wrap to stabilize the knee
            <br />.
            Elevation: Raise the knee above heart level to reduce swelling.
            <br />
            Surgical Intervention: Often required for full ACL tears. Surgery to reconstruct the ligament may be necessary, followed by physical therapy.
            <br />
            Physical Therapy: Strengthening exercises to restore mobility and strength to the knee.    
            <br />
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Hamstring Strain</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            <strong>Overview:</strong>
            <br />
            Hamstring strains occur when the muscles in the back of the thigh are overstretched or torn, often during sprinting or sudden acceleration.
            <br />
            <strong>Symptoms:</strong>
            <br />
            Sharp pain in the back of the thigh.
            <br />
            Swelling and bruising around the hamstring area.
            <br />
            Difficulty straightening the leg or walking without limping.
            <br />
            Muscle tightness or weakness.
            <br />
            Pain during stretching or contraction of the muscle.
            <br />
            <strong>Treatment:</strong>
            <br />
            Rest: Avoid putting pressure on the leg.
            <br />
            Ice: Apply ice packs for 15-20 minutes every few hours to reduce swelling.
            <br />
            Compression: Use an elastic bandage to support the muscle.
            <br />
            Elevation: Raise the leg to reduce swelling.
            <br />
            Pain Relief: NSAIDs (e.g., ibuprofen) for pain management.
            <br />
            Physical Therapy: Stretching and strengthening exercises as the muscle heals.
            <br />
            Gradual Return to Activity: Start with gentle movements and gradually increase activity as healing progresses.  
            <br />
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Groin Strain</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            Overview:
            <br />
            A groin strain is a tear or overstretching of the muscles in the inner thigh, often caused by sudden movements such as kicking, turning, or sprinting.
            <br />

            <strong>Symptoms:</strong>
            <br />
            Pain in the inner thigh or groin area, especially when moving or stretching the leg.
            <br />
            Swelling and bruising around the groin.
            <br />
            Muscle weakness or tightness.
            <br />
            Difficulty running or kicking.
            <br />
            A sharp pain during certain movements, like cutting or pivoting.
            <br />
            <strong>Treatment:</strong>
            <br />
            Rest: Avoid activities that aggravate the injury.
            <br />
            Ice: Apply ice for 15-20 minutes every few hours to reduce swelling.
            <br />
            Compression: Use a compression bandage to support the injured area.
            <br />
            Elevation: Raise the injured leg to reduce swelling.
            <br />
            Pain Relief: Use NSAIDs to manage pain and inflammation.
            <br />
            Physical Therapy: Once healed, strengthening exercises to prevent future injuries.
            <br />
            Gradual Activity: Slowly return to activity, with a focus on stretching and strengthening the groin area.
            <br />
            </p>
        </div>
        <div style={{marginLeft:'10px'}}>
            <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Concussion</h1>
            <p style={{fontFamily:'revert', fontSize:'20px', padding:'2px, 1px', marginLeft:'10px', marginRight:'5px', textAlign:'left'}}>
            <strong>Overview:</strong>
            <br />
            A concussion is a traumatic brain injury caused by a blow to the head. In football, this is often caused by head-to-head collisions or accidental falls.
            <br />

            <strong>Symptoms:</strong>
            <br />
            Headache or pressure in the head.
            <br />
            Nausea or vomiting.
            <br />
            Confusion or difficulty concentrating.
            <br />
            Dizziness or balance problems.
            <br />
            Sensitivity to light or noise.
            <br />
            Loss of consciousness (in some cases).
            <br />
            <strong>Treatment:</strong>
            <br />
            Immediate Rest: Rest and avoid any physical activity, especially sports, until cleared by a doctor.
            <br />
            Medical Evaluation: Immediate evaluation by a medical professional to assess the severity of the concussion.
            <br />
            Gradual Return to Play: After full recovery, return to play gradually, following a step-by-step return-to-play protocol.
            <br />
            Cognitive Rest: Limit activities that require concentration, like reading or screen time, during recovery.
            <br />
            Pain Relief: Over-the-counter pain relievers for headaches, but avoid medication that can mask symptoms.
            <br />
            Monitoring: Close monitoring for any worsening of symptoms. If symptoms persist or worsen, medical attention is required. 
            <br />           
            
            </p>
        </div>
        <br />
        <div class="floating-buttons-container">
            <button onClick={() => scrollToSection(sectionOneRef)} className="floating-button2"><LucideArrowBigUp /></button>
            <button onClick={() => scrollToSection(sectionThreeRef)} className="floating-button"><LucideArrowBigDown /></button>
        </div>
        <div ref={sectionThreeRef}>

        </div>
        <Footer />
    </>
  )
}

export default Football
