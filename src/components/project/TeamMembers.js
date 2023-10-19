import { useState } from "react";
import MemberProfile from "../common/MemberProfile";
import styled from "styled-components";
import { BiCrown } from "react-icons/bi";

export default function Example({ projectMembers }) {
  const [memberProfile, setMemberProfile] = useState({ show: false });
  const [memberInfo, setMemberInfo] = useState({});
  const admin =
    projectMembers &&
    projectMembers.find((member) => member.authority === "ADMIN");

  return (
    <>
      <div
        className="bg-white py-24 sm:py-32"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our members
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              프로젝트 구성원을 소개합니다.
            </p>
            {admin && (
              <AdminBox>
                <div key={admin.memberId}>
                  <div className="flex items-center gap-x-6">
                    <MemberImage
                      className="h-16 w-16 rounded-full"
                      src={admin.profileImage}
                      alt=""
                      onClick={() => {
                        setMemberInfo({
                          memberId: admin.memberId,
                          projectId: admin.projectId,
                        });
                        setMemberProfile({ show: true });
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <AdminName>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {admin.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">
                        <BiCrown size="20px" />
                        <span>ADMIN</span>
                      </p>
                    </AdminName>
                  </div>
                </div>
              </AdminBox>
            )}
          </div>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {projectMembers &&
              projectMembers.length !== 0 &&
              projectMembers.map(
                (member) =>
                  member.status === "ACTIVE" &&
                  member.authority !== "ADMIN" && (
                    <li key={member.memberId}>
                      <div className="flex items-center gap-x-6">
                        <MemberImage
                          className="h-16 w-16 rounded-full"
                          src={member.profileImage}
                          alt=""
                          onClick={() => {
                            setMemberInfo({
                              memberId: member.memberId,
                              projectId: member.projectId,
                            });
                            setMemberProfile({ show: true });
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <div>
                          <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold leading-6 text-indigo-600">
                            {member.authority}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
      {memberProfile.show && (
        <MemberProfile
          onClose={() => setMemberProfile({ show: false })}
          memberInformation={{
            isOthers: true,
            memberId: memberInfo.memberId,
            projectId: memberInfo.projectId,
          }}
        />
      )}
    </>
  );
}

const MemberImage = styled.img`
  border-radius: 5rem;
  width: 80px;
  height: 80px;
  border: 5px solid rgba(255, 0, 0, 0);

  &:hover {
    cursor: pointer;
    border: 5px solid #cdb4db;
  }
`;

const AdminBox = styled.div`
  padding: 10px;
  border: 1px solid #333;
  background-color: #dedbd2;
  width: 230px;
  border-radius: 10px;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AdminName = styled.div`
  & > p {
    display: flex;
    color: rgb(79 70 229);
    align-items: center;
    font-weight: bold;
    gap: 5px;
  }
`;
