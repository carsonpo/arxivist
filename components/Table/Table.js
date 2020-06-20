import * as Styled from "./Table.style";
import moment from "moment";

export default function Table({
  rows,
  columns,
  sortBy,
  timefields,
  increment,
}) {
  return (
    <Styled.TableRoot>
      <Styled.TableHeader>
        {columns &&
          columns.map((col) => (
            <Styled.TableHeaderItem>{col}</Styled.TableHeaderItem>
          ))}
        {increment && <Styled.TableHeaderItem>Upvote</Styled.TableHeaderItem>}
      </Styled.TableHeader>
      {rows &&
        rows
          .sort((a, b) => b[sortBy] - a[sortBy])
          .map((row) => (
            <Styled.TableRow>
              {row &&
                columns.map((col) => (
                  <Styled.TableItem>
                    {timefields && timefields.includes(col)
                      ? moment(row[col]).format("MMM DD")
                      : row[col]}
                  </Styled.TableItem>
                ))}
              {increment && (
                <Styled.TableItem>
                  <Styled.UpvoteButton
                    onClick={() => increment(row["arxivId"])}
                  >
                    &#9650;
                  </Styled.UpvoteButton>
                </Styled.TableItem>
              )}
            </Styled.TableRow>
          ))}
    </Styled.TableRoot>
  );
}
