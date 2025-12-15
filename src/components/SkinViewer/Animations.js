import { PlayerAnimation } from 'skinview3d';

// export class Bet extends PlayerAnimation {
//   animate(player) {
//     // Multiply by animation's natural speed
//     const t = this.progress * 15 + Math.PI * 0.5

//     // Leg swing with larger amplitude
//     player.skin.leftLeg.rotation.x = Math.cos(t + Math.PI) * 1.3
//     player.skin.rightLeg.rotation.x = Math.cos(t) * 1.3

//     // Arm swing
//     player.skin.leftArm.rotation.x = Math.cos(t) * 1.5
//     player.skin.rightArm.rotation.x = Math.cos(t + Math.PI) * 1.5
//     const basicArmRotationZ = Math.PI * 0.1
//     player.skin.leftArm.rotation.z = Math.cos(t) * 0.1 + basicArmRotationZ
//     player.skin.rightArm.rotation.z =
//       Math.cos(t + Math.PI) * 0.1 - basicArmRotationZ

//     // Jumping
//     player.position.y = Math.cos(t * 2)
//     // Dodging when running
//     player.position.x = Math.cos(t) * 0.15
//     // Slightly tilting when running
//     player.rotation.z = Math.cos(t + Math.PI) * 0.01

//     // Apply higher swing frequency, lower amplitude,
//     // and greater basic rotation around x axis,
//     // to cape when running.
//     const basicCapeRotationX = Math.PI * 0.3
//     player.cape.rotation.x = Math.sin(t * 2) * 0.1 + basicCapeRotationX

//     // What about head shaking?
//     // You shouldn't glance right and left when running dude :P
//   }
// }

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}


export class BetterFlying extends PlayerAnimation {
  animate(player) {
    // Body rotation finishes in 0.5s
    // Elytra expansion finishes in 3.3s

    const t = this.progress > 0 ? this.progress * 20 : 0
    const startProgress = clamp((t * t) / 100, 0, 1)

    player.rotation.x = (startProgress * Math.PI) / 2
    player.skin.head.rotation.x =
      startProgress > 0.5 ? Math.PI / 4 - player.rotation.x : 0

    const basicArmRotationZ = Math.PI * 0.25 * startProgress
    player.skin.leftArm.rotation.z = basicArmRotationZ
    player.skin.rightArm.rotation.z = -basicArmRotationZ

    const elytraRotationX = 0.34906584
    const elytraRotationZ = Math.PI / 2
    const interpolation = Math.pow(0.9, t)
    player.elytra.leftWing.rotation.x =
      elytraRotationX + interpolation * (0.2617994 - elytraRotationX)
    player.elytra.leftWing.rotation.z =
      elytraRotationZ + interpolation * (0.2617994 - elytraRotationZ)
    player.elytra.updateRightWing()

    // Multiply by animation's natural speed
    const t2 = this.progress * 8;

    // // Leg swing with larger amplitude
    // player.skin.leftLeg.rotation.x = Math.cos(t + Math.PI) * 1.3
    // player.skin.rightLeg.rotation.x = Math.cos(t) * 1.3

    // // Arm swing
    // player.skin.leftArm.rotation.x = Math.cos(t) * 1.5
    // player.skin.rightArm.rotation.x = Math.cos(t + Math.PI) * 1.5
    // const basicArmRotationZ = Math.PI * 0.1
    // player.skin.leftArm.rotation.z = Math.cos(t) * 0.1 + basicArmRotationZ
    // player.skin.rightArm.rotation.z =
    //   Math.cos(t + Math.PI) * 0.1 - basicArmRotationZ

    // Leg swing
    player.skin.leftLeg.rotation.x = Math.sin(t * 0.05) * 0.05;
    player.skin.rightLeg.rotation.x = Math.cos(t * 0.05 + Math.PI * 0.05) * 0.05;
    const basicLegRotationZ = Math.PI * 0.025;
    player.skin.leftLeg.rotation.z = Math.sin(t * 0.15) * 0.03 + basicLegRotationZ;
    player.skin.rightLeg.rotation.z = Math.cos(t * 0.15) * 0.03 - basicLegRotationZ;

    // Arm swing
    player.skin.leftArm.rotation.x = Math.sin(t * 0.15) * 0.05;
    player.skin.rightArm.rotation.x = Math.cos(t * 0.15) * 0.05;
    const basicArmRotationZ2 = Math.PI * 0.1;
    player.skin.leftArm.rotation.z = Math.sin(t * 0.15) * 0.03 + basicArmRotationZ2;
    player.skin.rightArm.rotation.z = Math.cos(t * 0.15) * 0.03 - basicArmRotationZ2;

    // Head shaking with different frequency & amplitude
    player.skin.head.rotation.y = Math.sin(t * 0.06) * 0.1;

    // Jumping
    player.position.y = Math.cos(t2 * 0.15) * 1.2 - 5
    // Dodging when running
    player.position.x = Math.sin(t2 * 0.15) * 0.7 + 2.5
    // Slightly tilting when flying
    player.rotation.z = Math.cos(t2 * 0.5) * 0.01
    // player.rotation.y = Math.sin(t2 * 0.25) * 0.05


    // Apply higher swing frequency, lower amplitude,
    // and greater basic rotation around x axis,
    // to cape when running.
    const basicCapeRotationX = Math.PI * 0.3
    player.cape.rotation.x = Math.sin(t2 * 2) * 0.1 + basicCapeRotationX
    player.cape.rotation.y = Math.sin(t2 * 2) * 0.1

    // What about head shaking?
    // You shouldn't glance right and left when running dude :P
  }
}

export class BetterIdle extends PlayerAnimation {
  animate(player) {
    // Multiply by animation's natural speed
    const t = this.progress * 2 - 15

    // Arm swing
    const basicArmRotationZ = Math.PI * 0.02
    player.skin.leftArm.rotation.z = Math.cos(t) * 0.03 + basicArmRotationZ
    player.skin.rightArm.rotation.z =
      Math.cos(t + Math.PI) * 0.03 - basicArmRotationZ

    // Always add an angle for cape around the x axis
    const basicCapeRotationX = Math.PI * 0.06
    player.cape.rotation.x = Math.sin(t) * 0.01 + basicCapeRotationX

    // Head shaking with different frequency & amplitude
    player.skin.head.rotation.y = Math.sin(t * 0.41) * 0.15;
    player.skin.head.rotation.x = Math.cos(t) * 0.01;
  }
}

export class BetterIdle2 extends PlayerAnimation {
  animate(player) {
    // Multiply by animation's natural speed
    const t = this.progress * 2 + 10

    // Arm swing
    const basicArmRotationZ = Math.PI * 0.02
    player.skin.leftArm.rotation.z = Math.cos(t) * 0.03 + basicArmRotationZ
    player.skin.rightArm.rotation.z =
      Math.cos(t + Math.PI) * 0.03 - basicArmRotationZ

    // Always add an angle for cape around the x axis
    const basicCapeRotationX = Math.PI * 0.06
    player.cape.rotation.x = Math.sin(t) * 0.01 + basicCapeRotationX

    // Head shaking with different frequency & amplitude
    player.skin.head.rotation.y = Math.sin(t * 0.38) * 0.25;
    player.skin.head.rotation.x = Math.cos(t) * 0.01;
  }
}

export class BetterIdle3 extends PlayerAnimation {
  animate(player) {
    // Multiply by animation's natural speed
    const t = this.progress * 2 - 10

    // Arm swing
    const basicArmRotationZ = Math.PI * 0.02
    player.skin.leftArm.rotation.z = Math.cos(t) * 0.03 + basicArmRotationZ
    player.skin.rightArm.rotation.z =
      Math.cos(t + Math.PI) * 0.03 - basicArmRotationZ

    // Always add an angle for cape around the x axis
    const basicCapeRotationX = Math.PI * 0.06
    player.cape.rotation.x = Math.sin(t) * 0.01 + basicCapeRotationX

    // Head shaking with different frequency & amplitude
    player.skin.head.rotation.y = Math.sin(t * 0.30) * 0.25 + 0.2;
    player.skin.head.rotation.x = Math.cos(t) * 0.01;
  }
}


