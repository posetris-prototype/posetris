function loopThroughPoses(poses, bodyParts) {
  poses.forEach(pose => {
    let noseData = pose.pose.keypoints[0];
    let leftShoulderData = pose.pose.keypoints[5];
    let rightShoulderData = pose.pose.keypoints[6];
    let leftHipData = pose.pose.keypoints[11];
    let rightHipData = pose.pose.keypoints[12];

    //Left arm test
    let leftElbowData = pose.pose.keypoints[7];
    let leftWristData = pose.pose.keypoints[9];

    if (leftElbowData.score > 0.2 && leftWristData.score > 0.2) {
      bodyParts.leftShoulder.x = leftShoulderData.position.x;
      bodyParts.leftShoulder.y = leftShoulderData.position.y;
      bodyParts.leftElbow.x = leftElbowData.position.x;
      bodyParts.leftElbow.y = leftElbowData.position.y;
      bodyParts.leftWrist.x = leftWristData.position.x;
      bodyParts.leftWrist.y = leftWristData.position.y;
    }

    //Calculate length of body
    let topEdge = Math.abs(
      (leftShoulderData.position.y + rightShoulderData.position.y) / 2
    );
    let bottomEdge = Math.abs(
      (leftHipData.position.y + rightHipData.position.y) / 2
    );

    //Calculate width of body
    let width = Math.abs(leftHipData.position.x - rightHipData.position.x);

    if (noseData.score > 0.2) {
      bodyParts.nose.x = noseData.position.x;
      bodyParts.nose.y = noseData.position.y;
    }

    if (
      leftShoulderData.score > 0.2 &&
      rightShoulderData.score > 0.2 &&
      leftHipData.score > 0.2 &&
      rightHipData.score > 0.2
    ) {
      // bodyParts.leftShoulder.x = leftShoulderData.position.x;
      // bodyParts.leftShoulder.y = leftShoulderData.position.y;
      // bodyParts.rightShoulder.x = rightShoulderData.position.x;
      // bodyParts.rightShoulder.y = rightShoulderData.position.y;

      // bodyParts.lefttHip.x = leftHipData.position.x;
      // bodyParts.leftHip.y = leftHipData.position.y;
      // bodyParts.rightHip.x = rightHipData.position.x;
      // bodyParts.rightHip.y = rightHipData.position.y;

      topEdge = Math.abs(
        (leftShoulderData.position.y + rightShoulderData.position.y) / 2
      );
      bottomEdge = Math.abs(
        (leftHipData.position.y + rightHipData.position.y) / 2
      );
      width = Math.abs(leftHipData.position.x - rightHipData.position.x);

      bodyParts.body.length = topEdge - bottomEdge;
      bodyParts.body.width = width;
      bodyParts.body.x =
        (leftShoulderData.position.x +
          rightShoulderData.position.x +
          leftHipData.position.x +
          rightHipData.position.x) /
        4;
      bodyParts.body.y = (topEdge + bottomEdge) / 2;
    }
  });
}
export default loopThroughPoses;
