import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type ItemProps = {
  type: "leader" | "member";
  aprovals: boolean;
  tasksPending: boolean;
  team?: string;
}

type Props = {
  activities: any[];
}

export default function InFocus({activities}: Props) {
  const ItemFocus = ({type, aprovals, tasksPending, team}: ItemProps) => {
    return (
      <Link href={'/(tabs)/teams'} style={styles.itemLink}>
        <View style={styles.itemContent}>
          <View style={styles.box1}>
            <Ionicons
              name={type === 'leader' ? "shield-checkmark" : "rocket"}
              size={32}
              color={type === 'leader' ? "#ffd33d" : "#38bdf8"}
              style={styles.icon}
            />
          </View>
          <View style={styles.box2}>
            <Text style={styles.titleItem}>{type === 'leader' ? 'Leader Actions' : 'Next Mission'}</Text>
            <Text style={styles.message} numberOfLines={2} ellipsizeMode='tail'>
              {type === 'leader' ?
                  aprovals ? "You have Aproval Pending" : "You are free from aprovals"
                :
                  tasksPending ? `New Tasks in ${team}` : "Nice! You don't have any task"
              }
            </Text>
          </View>
          <View style={styles.box3}>
            <Ionicons name="chevron-forward" size={32} color={"#a1a1a1"} />
          </View>
        </View>
      </Link>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleSection}>Em Foco</Text>
      {
        activities.length === 0 ? 
        <Text style={styles.noActivity}>Nenhuma atividade em foco</Text>
        :
        <View style={styles.itemsList}>
          {activities.map((value: any, index: number) => {
            return (
              <View style={[
                styles.mapItem,
                index === 0 && styles.firstItem,
                index === activities.length - 1 && styles.lastItem
              ]}
                key={value.id}
              >
                <ItemFocus
                  type={value.type}
                  aprovals={value.aprovals_pending !== null}
                  tasksPending={value.tasks_pending}
                  team={value.team}
                />
              </View>
            )
          })}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  titleSection: {
    fontSize: 16,
    color: "#a1a1a1",
    marginBottom: 4
  },
  itemsList: {
    gap: 12,
    paddingVertical: 2
  },
  noActivity: {
    color: "#b0b0b0",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 24,
    fontSize: 16
  },
  mapItem: {
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 18,
    overflow: "hidden"
  },
  firstItem: {
    marginTop: 0
  },
  lastItem: {
    marginBottom: 0
  },
  itemLink: {
    width: "100%",
    backgroundColor: "#252c3a",
    borderRadius: 16,
    minHeight: 88,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 14,
  },
  box1: {
    flex: 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: "#323843",
    paddingVertical: 12,
    paddingRight: 8
  },
  box2: {
    flex: 0.70,
    paddingLeft: 10,
    justifyContent: "center"
  },
  box3: {
    flex: 0.10,
    paddingLeft: 10,
    justifyContent: "center"
  },
  icon: {
    marginRight: 3
  },
  titleItem: {
    fontSize: 10,
    color: '#a1a1a1',
    fontWeight: "600",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  message: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20
  }
})